import { type AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import "~/styles/globals.css";

import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Home - Yet Another Twitter Clone</title>
        <meta name="description" content="Yet Another Twitter Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
