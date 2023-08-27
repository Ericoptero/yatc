import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/Layout";
import Image from "next/image";
import { PostView } from "~/components/PostView";
import { generateServerSideHelpers } from "~/server/helpers/serverSideHelpers";

type ProfilePageProps = InferGetStaticPropsType<typeof getStaticProps>;

type ProfileStaticPropsContext = GetStaticPropsContext<{ slug: string }>;

function ProfileFeed(props: { userId: string; userName: string | null }) {
  const { data, isLoading } = api.post.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data || data.length === 0)
    return <div>No posts from {props.userName ?? ""}</div>;

  return (
    <div className="flex flex-col">
      {data.map((postWithUser) => (
        <PostView key={postWithUser.post.id} {...postWithUser} />
      ))}
    </div>
  );
}

export default function ProfilePage({ username }: ProfilePageProps) {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>{`@${data.username}'s Profile - YATC`}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600">
          <Image
            src={data.imageUrl}
            alt={`${data.username}'s profile picture`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 ml-4 translate-y-1/2 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="border-b border-slate-400 p-4 text-2xl font-bold">{`@${data.username}`}</div>
        <ProfileFeed userId={data.id} userName={data.username} />
      </PageLayout>
    </>
  );
}

export const getStaticProps = async (context: ProfileStaticPropsContext) => {
  const helpers = generateServerSideHelpers();

  const slug = context.params?.slug;

  if (typeof slug !== "string") return new Error("Invalid slug");

  const username = slug.replace("@", "");

  await helpers.profile.getUserByUsername.prefetch({ username: username });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
