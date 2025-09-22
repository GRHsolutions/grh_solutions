import { Dayjs } from "dayjs";

export type History = {
  _id: string;
  requestId: string;
  profileId: { _id: string; nombre: string } | string | null; // puede ser null
  description: string;
  createdAt: Dayjs | string; // puede venir como string ISO del backend
};
