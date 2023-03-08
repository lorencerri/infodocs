import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "~/utils/api";
import { NoDocumentSelected } from "./NoDocumentSelected";
import { useState, useEffect } from "react";

type DocumentType = RouterOutputs["document"]["getAll"][0] | null;

export const DocumentHeader = ({
  selectedDocument,
}: {
  selectedDocument: DocumentType;
}) => {
  const { data: sessionData } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setTitle(selectedDocument?.title || "");
    setDescription(selectedDocument?.description || "");
  }, [selectedDocument]);

  const editDocument = api.document.update.useMutation();
  if (!selectedDocument) return <NoDocumentSelected />;
  return (
    <div className="navbar min-h-16 mb-5 rounded-lg bg-base-200">
      <div className="w-full flex-1 gap-2">
        <input
          type="text"
          placeholder="Title"
          className="input input-md w-full max-w-xs"
          defaultValue={selectedDocument?.title || ""}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="input input-md w-full min-w-[45vw] max-w-xs"
          defaultValue={selectedDocument?.description || ""}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <a
          type="text"
          placeholder="Type here"
          className="btn btn-success"
          onClick={() => {
            editDocument.mutate({
              id: selectedDocument.id,
              hidden: selectedDocument.hidden,
              title,
              description,
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
