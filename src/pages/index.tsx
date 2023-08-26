import Head from "next/head";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";

import { type RouterOutputs, api } from "~/utils/api";

import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingPage, LoadingSpinner } from "~/components/Loading";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
    },
    onError: (error) => {
      const validationError = error.data?.zodError?.fieldErrors.content;
      if (validationError?.[0]) {
        toast.error(validationError[0]);
      } else {
        toast.error("Failed to post, try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.imageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        type="text"
        placeholder="Type what you want!!"
        className="grow bg-transparent outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
      />
      {!isPosting && input !== "" && (
        <button type="submit" onClick={() => mutate({ content: input })}>
          Post
        </button>
      )}

      {isPosting && (
        <div className="relative flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

type PostWithUser = RouterOutputs["post"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div className="flex gap-3 border-b border-slate-400 p-4">
      <Link href={`/@${author.username}`}>
        <Image
          src={author.imageUrl}
          alt={`@${author.username}'s profile picture`}
          className="h-14 w-14 rounded-full"
          width={56}
          height={56}
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex gap-1 font-bold text-slate-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username}`}</span>
          </Link>

          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{`· ${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.post.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((postWithUser) => (
        <PostView {...postWithUser} key={postWithUser.post.id} />
      ))}
    </div>
  );
};

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // This is called here, just to get the data as fast as possible
  // to the Feed Component use the cached data from this call.
  api.post.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Home - Yet Another Twitter Clone</title>
        <meta name="description" content="Yet Another Twitter Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!isSignedIn && (
              <div className="flex justify-center">
                <SignInButton mode="modal">
                  <button type="button">Sign in</button>
                </SignInButton>
              </div>
            )}
            {isSignedIn && <CreatePostWizard />}
          </div>

          <Feed />
        </div>
      </main>
    </>
  );
}
