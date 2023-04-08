import { type NextPage } from "next";
import Head from "next/head";

import { Header } from "~/components/Header/Header";
import { Hero } from "~/components/Home/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>InfoDocs - Home</title>
        <meta name="description" content="InfoDocs Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <Header />
        <Hero />
      </div>
    </>
  );
};

export default Home;
