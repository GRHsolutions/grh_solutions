import axios, { AxiosPromise } from "axios"
import { CreateVacancyDto } from "../../models/vacantes/vacantes.entities";

const LOGINMAINAPI = "/api/vacancies";
export const getVacancies = (token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/getAll`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
}

export const createVacancy = (data: CreateVacancyDto, token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/create`;
  return axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const deleteVacancy = (id: string, token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/delete?id=${id}`;
  return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
}

export const updateVacancy = (id: string, data: CreateVacancyDto, token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/update/${id}`;
  return axios.put(url, data, { headers: { Authorization: `Bearer ${token}` } });
}