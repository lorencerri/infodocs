import { useEffect } from "react";
import { type NextPage } from "next";
import { Header } from "~/components/Header/Header";
import { Sidebar } from "~/components/Sidebar/Sidebar";
import { api } from "~/utils/api";
import { DocumentHeader } from "~/components/Document/DocumentHeader";
import { useAtom } from "jotai";
import { documentsAtom } from "~/atoms";
import { useSession } from "next-auth/react";

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
    <main className="m-5">
      <div className="container mx-auto">
        <Header />
        <div className="mt-5 flex min-h-[85vh] flex-col gap-5 md:flex-row">
          <Sidebar />
          <div className="hero mt-0 flex flex-col">
            <DocumentHeader />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Documents;
