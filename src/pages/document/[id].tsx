import { type NextPage } from "next";
import { Header } from "~/components/Header/Header";
import { api } from "~/utils/api";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useRouter } from "next/router";

const DocumentPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") return <></>;
  const { data: documentData } = api.document.get.useQuery({
    id: parseInt(id),
  });
  const { data: componentData } = api.component.getAllForDocument.useQuery({
    documentId: parseInt(id),
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
