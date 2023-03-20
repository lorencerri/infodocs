import { ComponentType } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { useAtom } from "jotai";
import { selectedDocumentAtom, refetchesAtom } from "~/atoms";

export const AddComponentBar = () => {
  const [selected, setSelected] = useState<ComponentType | null>(null);
  const createComponent = api.component.create.useMutation();
  const [selectedDocument] = useAtom(selectedDocumentAtom);
  const [refetches] = useAtom(refetchesAtom);

  if (!selectedDocument) return null;
  return (
    <div className="hero min-h-8 mb-5 rounded-lg bg-base-200 p-2 text-center">
      <div className="flex gap-2">
        <select
          className="select select-sm"
          onChange={(e) => {
            setSelected(
              ComponentType[e.target.value as keyof typeof ComponentType]
            );
          }}
        >
          <option disabled selected>
            Select Component
          </option>
          <option value="TEXT">Text</option>
          <option value="VIDEO">Video</option>
        </select>
        <button
          placeholder="Type here"
          className={`btn-sm btn ${selected ? "btn-success" : "btn-disabled"}`}
          onClick={() => {
            void (async () => {
              if (selected && selectedDocument) {
                await createComponent.mutateAsync({
                  type: selected,
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
          Add
        </button>
      </div>
    </div>
  );
};
