import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TextComponent = ({
  header,
  content,
  id,
}: {
  header: string | null;
  content: string | null;
  id: string;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="min-h-16 relative mb-5 w-full rounded-lg bg-base-200 p-5 text-center"
    >
      <kbd className="kbd absolute top-0 right-0 h-16 w-16">A</kbd>
      <input
        className="input-bordered input input-sm w-full"
        type="text"
        defaultValue={header || ""}
      />
      <textarea
        className="textarea-bordered textarea mt-2 w-full"
        defaultValue={content || ""}
      ></textarea>
    </div>
  );
};
