import { Dayjs } from "dayjs";

export type TypeContract = {
  _id: string;
  name: string;
  description?: string | null;
  content?: string | null;
  createdAt?: string | Dayjs;
  updatedAt?: string | Dayjs;
};
