import Head from "next/head";

export default function SinglePostPage() {
  return (
    <>
      <Head>
        <title>Single post Page</title>
        <meta name="description" content="Single post Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div>Single post Page</div>
      </main>
    </>
  );
}
