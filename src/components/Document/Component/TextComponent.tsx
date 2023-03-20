/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { api } from "~/utils/api";

export const TextComponent = ({
  header,
  content,
  id,
  refetch,
}: {
  header: string | null;
  content: string | null;
  id: string;
  refetch: any;
}) => {
  const [headerText, setHeaderText] = useState<string>(header || "");
  const [contentText, setContentText] = useState<string>(content || "");
  const [edited, setEdited] = useState<boolean>(false);

  const editComponent = api.component.update.useMutation();
  const deleteComponent = api.component.delete.useMutation();

  return (
    <div className="min-h-16 relative mb-5 w-full rounded-lg bg-base-200 p-5 text-center">
      <div className="flex flex-row gap-2">
        <input
          className="input-bordered input input-sm w-full"
          type="text"
          value={headerText}
          onChange={(e) => {
            setHeaderText(e.target.value);
            setEdited(true);
          }}
        />
        <button
          className={`${edited ? "btn-success" : "btn-disabled"} btn-sm btn`}
          onClick={() => {
            editComponent.mutate({
              id,
              type: "TEXT",
              header: headerText,
              content: contentText,
            });

            setEdited(false);
          }}
        >
          Save
        </button>
        <button
          className="btn-error btn-sm btn"
          onClick={() => {
            deleteComponent.mutate({ id });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            refetch();
          }}
        >
          Delete
        </button>
      </div>
      <textarea
        className="textarea-bordered textarea mt-2 w-full"
        value={contentText}
        onChange={(e) => {
          console.log(e.target.value);
          setContentText(e.target.value);
          setEdited(true);
        }}
      ></textarea>
    </div>
  );
};
