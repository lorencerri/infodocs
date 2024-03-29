/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from "react";
import { type Component } from "@prisma/client";
import { api } from "~/utils/api";
import { selectedDocumentAtom } from "~/atoms";
import { TextComponentEdit } from "./TextComponentEdit";
import { useAtom } from "jotai";
import { refetchesAtom } from "~/atoms";

export const CompontentsContainer = () => {
  const [selectedDocument] = useAtom(selectedDocumentAtom);
  const id = selectedDocument?.id || 0; // TODO: I don't think this is the proper way to do this.
  const [, setRefetches] = useAtom(refetchesAtom);

  const [items, setItems] = useState<Component[]>([]);

  const { data, refetch } = api.component.getAllForDocument.useQuery({
    documentId: id,
  });

  useEffect(() => {
    if (refetch) {
      setRefetches((refetches) => ({ ...refetches, components: refetch }));
    } // Update refetches atom

    if (data) {
      setItems(data || []);
    }
  }, [setRefetches, refetch, data]); // TODO: Transform the data into the items array since it's a hook.

  return (
    <>
      {items?.map((item) => {
        return (
          <TextComponentEdit
            key={item.id}
            id={item.id}
            header={item.header}
            content={item.content}
            refetch={refetch}
          />
        );
      })}
    </>
  );
};
