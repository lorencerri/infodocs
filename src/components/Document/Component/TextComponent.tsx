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
      className="min-h-16 mb-5 w-full rounded-lg bg-base-200 p-5 text-center"
    >
      <h1 className="text-2xl">{header}</h1>
      <p>{content}</p>
    </div>
  );
};
