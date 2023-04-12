import { type NextPage } from "next";
import Head from "next/head";

import { Header } from "~/components/Header/Header";
import { DocumentsDisplay } from "~/components/Home/DocumentsDisplay";
import { Hero } from "~/components/Home/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Techgenix - Home</title>
        <meta name="description" content="Techgenix Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <Header />
        <Hero />
        <DocumentsDisplay />
      </div>
    </>
  );
};

export default Home;
