import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export const Sidebar = () => {
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
    <div className="menu  min-h-[25vh] basis-1/4 rounded-lg bg-base-200 p-5 text-center">
      <ul>
        {documents?.map((document) => {
          return (
            <li key={document.id}>
              <a>{document.title}</a>
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
