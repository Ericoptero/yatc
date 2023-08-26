import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { PageLayout } from "~/components/layout";

type ProfilePageProps = InferGetStaticPropsType<typeof getStaticProps>;

type ProfileStaticPropsContext = GetStaticPropsContext<{ slug: string }>;

export default function ProfilePage({ username }: ProfilePageProps) {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div>{data.username}</div>
      </PageLa>
    </>
  );
}

export const getStaticProps = async (context: ProfileStaticPropsContext) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

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
