/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState } from "react";
import { Component, ComponentType } from "@prisma/client";
import { api } from "~/utils/api";
import { selectedDocumentAtom } from "~/atoms";
import { TextComponent } from "./TextComponent";
import { useAtom } from "jotai";
import { refetchesAtom } from "~/atoms";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export const CompontentsContainer = () => {
  const [selectedDocument] = useAtom(selectedDocumentAtom);
  const id = selectedDocument?.id || 0; // TODO: I don't think this is the proper way to do this.
  const [, setRefetches] = useAtom(refetchesAtom);

  const [items, setItems] = useState<Component[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data, refetch } = api.component.getAllForDocument.useQuery({
    documentId: id,
  });

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    console.log(active.id, over.id);
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        console.log(oldIndex, newIndex);
        const newArray = arrayMove(items, oldIndex, newIndex);
        console.log(newArray);
        return newArray;
      });
    }
  };

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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items?.map((item) => {
            switch (item.type) {
              case ComponentType.TEXT:
                return (
                  <TextComponent
                    key={item.id}
                    id={item.id}
                    header={item.header}
                    content={item.id}
                  />
                );
              case ComponentType.VIDEO:
                return <div>Video</div>;
              default:
                return <div>Unknown</div>;
            }
          })}{" "}
        </SortableContext>
      </DndContext>
    </>
  );
};
