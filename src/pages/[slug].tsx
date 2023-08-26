import Head from "next/head";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div>Profile Page</div>
      </main>
    </>
  );
}
