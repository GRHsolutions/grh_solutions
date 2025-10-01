import { Dayjs } from "dayjs";
import { DragNDropVariables } from "../../../generics/grh-generics/DragNDrop";

export type Request = {
_id: string;
createdBy: User | string;
title: string;
status: "pendiente" | "aprobada" | "rechazada" | "eliminada";
type_request: string;
infoDx?: string;
files?: FileAttachment[];
createdAt: Dayjs;
updatedAt: Dayjs;
[key: string]: any;
};

export type User = {
_id: string;
email: string;
nombre: string;
foto?: string;
};

export type FileAttachment = {
_id: string;
fileName: string;
fileUrl: string;
};

export interface RequestFilter {
title?: string;
status?: "pendiente" | "aprobada" | "rechazada" | "eliminada";
type_request?: string;
}

export interface RequestForm {
title: string;
type_request: string;
infoDx?: string;
files: DragNDropVariables[];
email: string;
}
