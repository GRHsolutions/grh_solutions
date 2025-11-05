export interface VacanteData {
  _id: string;
  tittle: string;
  description: string;
  type_contract: string;
  salary: string;
  horary: string;
  charge: string;
  address: string;
  telephone: string;
  email: string;
  type_modality: string;
  experience: string;
  formation: string;
  status: string;
  area: string
}

export interface CreateVacancyDto {
  tittle: string;
  description: string;
  type_contract: string;
  salary: string;
  horary: string;
  charge: string;
  address: string;
  telephone: string;
  email: string;
  type_modality: string;
  experience: string;
  formation: string;
  status: string;
  area: string
}

export interface Postulante {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  application_date: string;
  status: string;
}