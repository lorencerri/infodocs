import { useState } from "react";
import { type NextPage } from "next";
import { Header } from "~/components/Header/Header";
import { Sidebar } from "~/components/Sidebar/Sidebar";
import type { RouterOutputs } from "~/utils/api";
import { DocumentHeader } from "~/components/Document/DocumentHeader";

type DocumentType = RouterOutputs["document"]["getAll"][0];

const Documents: NextPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(
    null
  );

  console.log(selectedDocument);

  return (
    <main className="m-5">
      <div className="container mx-auto">
        <Header />
        <div className="mt-5 flex min-h-[85vh] flex-col gap-5 md:flex-row">
          <Sidebar
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
          />
          <div className="hero mt-0 flex flex-col">
            <DocumentHeader selectedDocument={selectedDocument} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Documents;
