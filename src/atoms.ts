/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";
import { type RouterOutputs } from "./utils/api";

type DocumentType = RouterOutputs["document"]["getAll"][0] | null;

interface documentsAtomInterface {
  documents: DocumentType[];
  refetch?: () => any;
}

export const selectedDocumentAtom = atom<DocumentType | null>(null);
export const documentsAtom = atom<documentsAtomInterface>({ documents: [] });
