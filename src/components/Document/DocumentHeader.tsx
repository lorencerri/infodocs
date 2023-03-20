import { useState } from "react";
import { api } from "~/utils/api";
import { NoDocumentSelected } from "./NoDocumentSelected";
import { useAtom } from "jotai";
import { documentsAtom, selectedDocumentAtom } from "~/atoms";

export const DocumentHeader = () => {
  const [edited, setEdited] = useState(false);
  const [selectedDocument, setSelectedDocument] = useAtom(selectedDocumentAtom);
  const [_documents, setDocuments] = useAtom(documentsAtom);
  const { documents } = _documents;

  const editDocument = api.document.update.useMutation();
  const deleteDocument = api.document.delete.useMutation();
  if (!selectedDocument) return <NoDocumentSelected />;
  return (
    <div className="navbar min-h-8 mb-5 rounded-lg bg-base-200">
      <div className="w-full flex-1 flex-col gap-2 md:flex-row">
        {/** TODO: Create link to guide document */}
        <button className="btn-info btn-sm btn">Guide</button>
        <input
          type="text"
          placeholder="Title"
          className="input input-sm w-full max-w-xs"
          value={selectedDocument.title}
          onChange={(e) => {
            const document = documents.find(
              (doc) => doc?.id === selectedDocument.id
            );
            if (!document) return;
            selectedDocument.title = document.title = e.target.value;

            setEdited(true);
            setDocuments({ documents, refetch: _documents.refetch });
          }}
        />
        <input
          type="text"
          placeholder="Description"
          className="input input-sm w-full min-w-[40vw] max-w-xs"
          value={selectedDocument.description || ""}
          onChange={(e) => {
            const document = documents.find(
              (doc) => doc?.id === selectedDocument.id
            );
            if (!document) return;
            selectedDocument.description = document.description =
              e.target.value;

            setEdited(true);
            setDocuments({ documents, refetch: _documents.refetch });
          }}
        />
        <div className="flex gap-2">
          <a
            type="text"
            placeholder="Type here"
            className={`btn-sm btn ${edited ? "btn-success" : "btn-disabled"}`}
            onClick={() => {
              editDocument.mutate({
                id: selectedDocument.id,
                hidden: selectedDocument.hidden,
                title: selectedDocument.title,
                description: selectedDocument.description || "",
              });
              setEdited(false);
            }}
          >
            Save
          </a>
          <a
            type="text"
            placeholder="Type here"
            className={`btn-error btn-sm btn`}
            onClick={() => {
              const index = documents.findIndex(
                (d) => d?.id === selectedDocument.id
              );
              if (index !== undefined) {
                delete documents[index];
                setDocuments({ documents, refetch: _documents.refetch });
              }
              setSelectedDocument(null);
              deleteDocument.mutate({ id: selectedDocument.id });
            }}
          >
            Delete
          </a>
        </div>
      </div>
      <div className="flex-none"></div>
    </div>
  );
};
