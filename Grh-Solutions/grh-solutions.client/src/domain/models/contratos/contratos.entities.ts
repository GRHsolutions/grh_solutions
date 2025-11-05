import { Dayjs } from "dayjs";
import { Usuario } from "../usuario/user.entities";

export type Contracts = {
  id: string;
  title: string;
  contractType: string;
  html?: string; // para juardar un pdf jaja,
  createdAt: Dayjs;
  involved: Usuario[];
  attachedFiles?: any[];
};

export type InvolvedUsers = {
  id: string;
  type: "created-by" | "reviewer" | "main-signer" | "attached-signer"; // estos tipos de usuario
  referenceTo: Usuario[]; // referencia al usuario
  mustSign: boolean; // indicador para los que deben firmar el documento
  signedAt?: Date;
  signatureUrl?: string;
  signatureImage?: string;
};

export type HistoryContract = {};
