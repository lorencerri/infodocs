import { type NextPage } from "next";
import { Header } from "~/components/Header/Header";
import { api } from "~/utils/api";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

const DocumentPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: sessionData } = useSession();
  const { data: documentData } = api.document.get.useQuery({
    id: Number(id),
  });
  const { data: componentData } = api.component.getAllForDocument.useQuery({
    documentId: Number(id),
  });

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

          {sessionData?.user.id === documentData?.userId && (
            <div className="alert mt-3 border-2 border-solid border-cyan-500 bg-base-200 shadow-lg lg:mt-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>
                  This is your document, click{" "}
                  <b>
                    <Link href="/documents/">here</Link>
                  </b>{" "}
                  to edit it.
                </span>
              </div>
            </div>
          )}

          {!documentData ? (
            <h1>Sorry, not found.</h1>
          ) : (
            <div className="alert mb-4 mt-3 bg-base-200 shadow-lg lg:mt-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-10 flex-shrink-0 stroke-cyan-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>

                <div>
                  <h3 className="text-lg font-bold">{documentData.title}</h3>
                  <div className="text-md">{documentData.description}</div>
                </div>
              </div>
            </div>
          )}
          {componentData?.map((component) => (
            <div
              className="alert mb-4 mt-3 max-w-full bg-base-200 shadow-lg lg:mt-5"
              key={component.id}
            >
              <div>
                <div>
                  <h3 className="max-w-full text-lg font-bold">
                    {component.header}
                  </h3>
                  <div className="prose max-w-full">
                    {component.content && (
                      <ReactMarkdown>{component.content}</ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default DocumentPage;
