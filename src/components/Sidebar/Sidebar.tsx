import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import { DocumentRowItem } from "./DocumentRowItem";

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
      <div className="overflow-x-auto">
        <table className="table-compact table w-full">
          <tbody>
            {documents?.map((doc) => (
              <DocumentRowItem
                key={doc.id}
                item={doc}
                selected={doc.id === selectedDocument?.id}
                setSelectedDocument={setSelectedDocument}
              />
            ))}
            <tr>
              <td
                className="bg-inherit font-bold hover:cursor-pointer hover:bg-base-300"
                colSpan={2}
                onClick={() => {
                  createDocument.mutate({
                    hidden: false,
                    title: "Untitled Document",
                    description: "...",
                  });
                }}
              >
                Create New Document
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
