import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

type DocumentType = RouterOutputs["document"]["getAll"][0] | null;

export const Sidebar = ({
  selectedDocument,
  setSelectedDocument,
}: {
  selectedDocument: DocumentType;
  setSelectedDocument: React.Dispatch<React.SetStateAction<DocumentType>>;
}) => {
  const { data: sessionData } = useSession();

  const { data: documents, refetch: refetchDocuments } =
    api.document.getOwn.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  const createDocument = api.document.create.useMutation({
    onSuccess: () => {
      void refetchDocuments();
    },
  });

  return (
    <div className="menu min-h-[25vh] basis-1/4 rounded-lg bg-base-200 p-5 text-center">
      <ul>
        {documents?.map((doc) => {
          console.log(selectedDocument?.id === doc.id);
          return (
            <li
              key={doc.id}
              className={
                selectedDocument?.id === doc.id ? "rounded-lg bg-base-100" : ""
              }
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedDocument(doc);
                }}
              >
                {doc.title}
              </a>
            </li>
          );
        })}
        {(documents?.length || 0) > 0 && <div className="divider my-1" />}
        <li>
          <a
            className="font-bold"
            onClick={() => {
              createDocument.mutate({
                hidden: false,
                title: "Untitled Document",
                description: "...",
              });
            }}
          >
            Create New Document
          </a>
        </li>
      </ul>
    </div>
  );
};
