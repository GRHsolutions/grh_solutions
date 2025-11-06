import { Dayjs } from "dayjs";
import { Usuario } from "../usuario/user.entities";

export type TypeContract = {
  _id: string;
  name: string;
  description?: string | null;
  content?: string | null;
  createdAt?: string | Dayjs;
  updatedAt?: string | Dayjs;
};

export type Vacancy = {
  _id: string;
  tittle: string;
  description?: string | null;
  type_contract?: string | null;
  salary?: string | null;
  horary?: string | null;
  address?: string | null;
  telephone?: string | null;
  email?: string | null;
  type_modality?: string | null;
  experience?: string | null;
  formation?: string | null;
  status?: string | null;
  createdAt?: string | Dayjs;
  updatedAt?: string | Dayjs;
};

export type Contract = {
  _id: string; // usamos solo _id para mantener consistencia con tu API
  title: string;

  // Tipo de contrato
  tipo_contrato?: TypeContract | null;

  // Perfiles
  perfil_creador?: Usuario | null;
  perfil_empleado?: Usuario | null;

  // Datos del contrato
  eps: string;
  estrato: number;
  start_date: string | Dayjs;
  end_date?: string | Dayjs | null;

  arl: string;

  // Firmas
  firma_empleado?: string | null;   // base64
  firma_empleador?: string | null;  // base64

  estado: string;

  createdAt: string | Dayjs;
  updatedAt: string | Dayjs;

  // Relación con vacante
  vacante?: Vacancy | null;
};
