import { Dayjs } from "dayjs";

export type InvolvedProfile = {
  _id: string;
  user: string;
  name: string;
  lastname: string;
  date_of_birth: string;
  email: string;
  address?: string | null;
  number_phone?: string | null;
  rh: string;
  status: string;
  type_document: string;
  document: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  __v: number;
};

export type InvolvedRequest = {
  _id: string;
  createdBy: string;
  title: string;
  status: string;
  type_request: string;
  infoDx?: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  __v: number;
};

export type Involved = {
  _id: string;
  requestId: InvolvedRequest;
  profileId: InvolvedProfile | null;
  assignedBy: InvolvedProfile | null;
  role: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
  __v: number;
};
