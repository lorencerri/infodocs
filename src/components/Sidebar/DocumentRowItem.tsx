import { type RouterOutputs } from "~/utils/api";

type DocumentType = RouterOutputs["document"]["getAll"][0] | null;

export const DocumentRowItem = ({
  item,
  selected,
  setSelectedDocument,
}: {
  item: DocumentType;
  selected: boolean;
  setSelectedDocument: React.Dispatch<React.SetStateAction<DocumentType>>;
}) => {
  if (!item) return null;

  return (
    <>
      <tr
        key={item.id}
        className={`${
          selected ? "bg-base-100" : ""
        } max-h-11 hover:cursor-pointer hover:bg-base-300`}
      >
        <td
          className="bg-inherit"
          onClick={() => {
            setSelectedDocument(item);
          }}
        >
          {item.title}
        </td>
      </tr>
    </>
  );
};
