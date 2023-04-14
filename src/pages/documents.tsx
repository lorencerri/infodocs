import { useEffect } from "react";
import { type NextPage } from "next";
import { Header } from "~/components/Header/Header";
import { Sidebar } from "~/components/Sidebar/Sidebar";
import { api } from "~/utils/api";
import { DocumentHeader } from "~/components/Document/DocumentHeader";
import { useAtom } from "jotai";
import { documentsAtom } from "~/atoms";
import { useSession } from "next-auth/react";
import { AddComponentBar } from "~/components/Document/AddComponentBar";
import { CompontentsContainer } from "~/components/Document/Component/ComponentsContainer";
import Head from "next/head";

const Documents: NextPage = () => {
  const { data: sessionData } = useSession();

  const [, setDocuments] = useAtom(documentsAtom);
  const { data, refetch } = api.document.getOwn.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  useEffect(() => {
    if (data) setDocuments({ documents: data, refetch });
  }, [data, refetch, setDocuments]);

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
          {!sessionData?.user && (
            <div className="alert alert-error mt-3 shadow-lg lg:mt-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Please log in order to create and modify documents.</span>
              </div>
            </div>
          )}
          <div className="mt-5 flex min-h-[85vh] flex-col gap-5 md:flex-row">
            <Sidebar />

            <div className="hero mt-0 flex flex-col">
              <DocumentHeader />
              <CompontentsContainer />
              <AddComponentBar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Documents;
