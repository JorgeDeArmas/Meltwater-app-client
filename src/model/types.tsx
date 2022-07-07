import { Document } from "./document";
import { ReactNode } from "react";
import { FileDoc } from "./file-doc";
import { HttpResponse } from "./http-response";

export type ListDocumentState = {
   documents: Document[];
   selectedDocument: Document | null;
   downloadedFile: File | null;
   actions: {
      upload: boolean;
      preview: boolean;
      delete: boolean;
      loading: boolean;
   };
   search: {
      criteria: string;
   };
   pagination: {
      page: number;
   };
};

export type DocumentActions = "upload" | "preview" | "delete" | "loading";

export type PreviewDocumentParams = {
   document: Document | null;
   file: File | null;
   onClose: () => void;
   children?: ReactNode;
};

export type PreviewDocumentState = {
   documentUrl: string;
};

export type CreateDocumentState = {
   document: FileDoc;
   form: {
      fileValid: boolean;
      phraseValid: boolean;
      submitted: boolean;
   };
   progressBar: {
      percent: number;
      visible: boolean;
   };
};

export type CreateDocumentParams = {
   title: string;
   okLabel: string;
   cancelLabel: string;
   onSubmit: (data: HttpResponse) => void;
   onFail: (error: any) => void;
   onCancel: () => void;
   children?: ReactNode;
};

export type PaginationParams = {
   limit: number;
   prev: (page: number) => void;
   next: (page: number) => void;
};

export type PaginationState = {
   page: number;
};

export type FilterDocumentParams = {
   onFilter: (criteria: string) => void;
};

export type FilterDocumentState = {
   criteria: string;
};

export type DeleteConfirmationParams = {
   document: Document;
   onConfirm: () => Promise<void>;
   onCancel: () => void;
};
