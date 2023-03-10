/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";
import { type RouterOutputs } from "./utils/api";
import { Component } from "@prisma/client";

type DocumentType = RouterOutputs["document"]["getAll"][0] | null;

interface documentsAtomInterface {
  documents: DocumentType[];
  refetch?: () => any;
}

interface componentsAtomInterface {
  components: Component[];
  refetch?: () => any;
}

type refetchesType = {
  documents: (() => any) | null;
  components: (() => any) | null;
};

export const selectedDocumentAtom = atom<DocumentType | null>(null);
export const documentsAtom = atom<documentsAtomInterface>({ documents: [] });
export const componentsAtom = atom<componentsAtomInterface>({ components: [] });
export const refetchesAtom = atom<refetchesType>({
  documents: null,
  components: null,
});
