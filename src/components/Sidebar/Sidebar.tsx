import { api } from "~/utils/api";
import { DocumentRowItem } from "./DocumentRowItem";
import { useAtom } from "jotai";
import { documentsAtom, selectedDocumentAtom } from "~/atoms";

export const Sidebar = () => {
  const [_documents] = useAtom(documentsAtom);
  const [selectedDocument, setSelectedDocument] = useAtom(selectedDocumentAtom);
  const { documents } = _documents;

  const createDocument = api.document.create.useMutation({
    onSuccess: () => {
      if (_documents.refetch) void _documents.refetch();
    },
  });

  return (
    <div className="menu min-h-[25vh] basis-1/4 rounded-lg bg-base-200 p-5 text-center">
      <div className="overflow-x-auto">
        <table className="table-compact table w-full">
          <tbody>
            {documents?.map((doc) => (
              <DocumentRowItem
                key={doc?.id}
                item={doc}
                selected={doc?.id === selectedDocument?.id}
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
