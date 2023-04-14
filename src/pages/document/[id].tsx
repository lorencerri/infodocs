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
            <div className="alert alert-info mt-3 shadow-lg lg:mt-5">
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
            <div className="hero mt-3 bg-base-200 p-5 lg:mt-5 xl:rounded-lg">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="text-xl font-bold lg:text-2xl">
                    {documentData.title}
                  </h1>
                  <p className="pt-6">{documentData.description}</p>
                </div>
              </div>
            </div>
          )}
          {componentData?.map((component) => (
            <div
              key={component.id}
              className="hero mt-3 bg-base-200 p-5 lg:mt-5 xl:rounded-lg"
            >
              <div className="hero-content">
                <div className="max-w-md">
                  <h1 className=" text-xl lg:text-2xl">{component.header}</h1>
                  <article className="prose lg:prose-xl">
                    {component.content && (
                      <ReactMarkdown>{component.content}</ReactMarkdown>
                    )}
                  </article>
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
