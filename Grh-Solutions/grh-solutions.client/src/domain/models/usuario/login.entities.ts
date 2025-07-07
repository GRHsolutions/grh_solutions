import { Dayjs } from "dayjs";

export type Login = {
  email: string;
  password: string;
};

export type ReturnableLogin = {
  user: {
    email: string;
    photo: string;
  };
  token: string;
};

export type RegisterConfirmation = {
  message: string;
  code: string;
};

export type RegisterForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  typeDocument: string;
  document: string;
  birthDate: Dayjs;
};
