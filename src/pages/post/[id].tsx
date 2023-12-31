import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { generateServerSideHelpers } from "~/server/helpers/serverSideHelpers";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/Layout";
import { PostView } from "~/components/PostView";

type ProfilePageProps = InferGetStaticPropsType<typeof getStaticProps>;

type ProfileStaticPropsContext = GetStaticPropsContext<{ id: string }>;

export default function SinglePostPage({ id }: ProfilePageProps) {
  const { data } = api.post.getById.useQuery({
    id,
  });

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>{`${data.author.username}'s post - YATC`}</title>
      </Head>
      <PageLayout>
        <PostView key={data.post.id} {...data} />
      </PageLayout>
    </>
  );
}

export const getStaticProps = async (context: ProfileStaticPropsContext) => {
  const helpers = generateServerSideHelpers();

  const id = context.params?.id;

  if (typeof id !== "string") return new Error("Invalid id");

  await helpers.post.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
