import { Dayjs } from "dayjs";

export type Request = {
  _id: string;
  createdBy: User | string;
  title: string;
  status: "pendiente" | "aprobada" | "rechazada" | "eliminada";
  type_request: string;
  infoDx?: string;
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

export interface RequestFilter {
  title?: string;
  status?: "pendiente" | "aprobada" | "rechazada" | "eliminada";
  type_request?: string;
}
