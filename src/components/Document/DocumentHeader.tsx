import { api } from "~/utils/api";
import { NoDocumentSelected } from "./NoDocumentSelected";
import { useAtom } from "jotai";
import { documentsAtom, selectedDocumentAtom } from "~/atoms";

export const DocumentHeader = () => {
  const [selectedDocument] = useAtom(selectedDocumentAtom);
  const [_documents, setDocuments] = useAtom(documentsAtom);
  const { documents } = _documents;

  const editDocument = api.document.update.useMutation();
  if (!selectedDocument) return <NoDocumentSelected />;
  return (
    <div className="navbar min-h-16 mb-5 rounded-lg bg-base-200">
      <div className="w-full flex-1 gap-2">
        <input
          type="text"
          placeholder="Title"
          className="input input-md w-full max-w-xs"
          value={selectedDocument.title}
          onChange={(e) => {
            const document = documents.find(
              (doc) => doc?.id === selectedDocument.id
            );
            if (!document) return;
            document.title = e.target.value;

            setDocuments({ documents, refetch: _documents.refetch });
          }}
        />
        <input
          type="text"
          placeholder="Description"
          className="input input-md w-full min-w-[45vw] max-w-xs"
          value={selectedDocument.description || ""}
          onChange={(e) => {
            const document = documents.find(
              (doc) => doc?.id === selectedDocument.id
            );
            if (!document) return;
            document.description = e.target.value;

            setDocuments({ documents, refetch: _documents.refetch });
          }}
        />
        <a
          type="text"
          placeholder="Type here"
          className="btn btn-success"
          onClick={() => {
            const document = documents.find(
              (doc) => doc?.id === selectedDocument.id
            );
            if (!document) return;
            editDocument.mutate({
              id: document.id,
              hidden: document.hidden,
              title: document.title,
              description: document.title,
            });
          }}
        >
          Save
        </a>
      </div>
      <div className="flex-none"></div>
    </div>
  );
};
