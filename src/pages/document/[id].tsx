import { useEffect } from "react";
import { type NextPage } from "next";
import { Header } from "~/components/Header/Header";
import { api } from "~/utils/api";
import { useAtom } from "jotai";
import { documentsAtom } from "~/atoms";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

const DocumentPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") return <></>;
  const { data } = api.document.get.useQuery({ id: parseInt(id) });
  const item = data?.[0];

  return (
    <>
      <Head>
        <title>Techgenix - Your Documents</title>
        <meta name="description" content="Techgenix Your Documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-5">
        <div className="container mx-auto">
          <Header />
          {!item ? (
            <h1>Sorry, not found.</h1>
          ) : (
            <div className="hero mt-3 bg-base-200 p-5 lg:mt-5 xl:rounded-lg">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="text-xl font-bold lg:text-2xl">
                    {item.title}
                  </h1>
                  <p className="pt-6">{item.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DocumentPage;
