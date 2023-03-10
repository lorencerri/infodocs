import { useEffect } from "react";
import { ComponentType } from "@prisma/client";
import { api } from "~/utils/api";
import { selectedDocumentAtom } from "~/atoms";
import { TextComponent } from "./TextComponent";
import { useAtom } from "jotai";
import { refetchesAtom } from "~/atoms";

export const CompontentsContainer = () => {
  const [selectedDocument] = useAtom(selectedDocumentAtom);
  const id = selectedDocument?.id || 0; // TODO: I don't think this is the proper way to do this.
  const [, setRefetches] = useAtom(refetchesAtom);

  const { data, refetch } = api.component.getAllForDocument.useQuery({
    documentId: id,
  });

  useEffect(() => {
    setRefetches((refetches) => ({ ...refetches, components: refetch }));
    console.log("Refetching components");
  }, [setRefetches, refetch]);

  return (
    <>
      {data?.map((item) => {
        switch (item.type) {
          case ComponentType.TEXT:
            return (
              <TextComponent header={item.header} content={item.content} />
            );
          case ComponentType.VIDEO:
            return <div>Video</div>;
          default:
            return <div>Unknown</div>;
        }
      })}
    </>
  );
};
