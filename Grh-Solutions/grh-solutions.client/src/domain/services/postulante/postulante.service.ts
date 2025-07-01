import axios, { AxiosPromise } from "axios"

const LOGINMAINAPI = "/api/postulante";
export const getPostulantes = (vacantId: string, token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/getAllByVacante/${vacantId}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
}