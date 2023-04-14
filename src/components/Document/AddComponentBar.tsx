import { api } from "~/utils/api";
import { useAtom } from "jotai";
import { selectedDocumentAtom, refetchesAtom } from "~/atoms";

export const AddComponentBar = () => {
  const createComponent = api.component.create.useMutation();
  const [selectedDocument] = useAtom(selectedDocumentAtom);
  const [refetches] = useAtom(refetchesAtom);

  if (!selectedDocument) return null;
  return (
    <div className="hero min-h-8 mb-5 rounded-lg p-2 text-center">
      <div className="flex gap-2">
        <button
          placeholder="Type here"
          className="btn-success btn-sm btn"
          onClick={() => {
            void (async () => {
              if (selectedDocument) {
                await createComponent.mutateAsync({
                  type: "TEXT",
                  documentId: selectedDocument.id,
                  header: "Component Title",
                  content:
                    "## This is a text component.\n\n**It supports markdown formatting!**\n\nThis allows you to format text using special characters, including:\n1. **bold**\n2. *italic*\n3. lists.\netc.\n\n**Press preview to see what this looks like!**",
                });
                console.log(refetches);
                if (refetches.components) refetches.components();
              }
            })();
          }}
        >
          Add Text Component
        </button>
      </div>
    </div>
  );
};
