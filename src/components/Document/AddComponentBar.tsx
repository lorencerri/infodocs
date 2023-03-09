import { ComponentType } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { useAtom } from "jotai";
import { selectedDocumentAtom } from "~/atoms";

export const AddComponentBar = () => {
  const [selected, setSelected] = useState<ComponentType | null>(null);
  const createComponent = api.component.create.useMutation();
  const [selectedDocument] = useAtom(selectedDocumentAtom);

  if (!selectedDocument) return null;
  return (
    <div className="hero min-h-16 mb-5 rounded-lg bg-base-200 text-center">
      <div className="flex gap-2">
        <select
          className="select"
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
          className={`btn ${selected ? "btn-success" : "btn-disabled"}`}
          onClick={() => {
            if (selected && selectedDocument) {
              createComponent.mutate({
                type: selected,
                documentId: selectedDocument.id,
                header: "Demo Component",
                content: "Demo Content",
              });
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
