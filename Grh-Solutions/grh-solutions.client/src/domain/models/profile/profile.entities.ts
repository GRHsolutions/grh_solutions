export interface CreateProfileDto {
  user: string;
  name: string;
  lastname: string;
  date_of_birth: string;
  email: string;
  address: string;
  number_phone: number;
  telephone?: number;
  rh: string;
  status: string;
  type_document: string;
  document: number;
  vacancy_name: string;
  date_application?: string;
}

export interface Profile {
  data: any;
  _id: string;
  user: string;
  name: string;
  lastname: string;
  date_of_birth: string;
  email: string;
  address: string;
  number_phone: number;
  telephone?: number;
  rh: string;
  status: string;
  type_document: string;
  document: number;
  vacancy_name: string;
  date_application?: string;
}

export interface IOption {
  value: string;
  name: string;
}