import axios, { AxiosPromise } from "axios"

const LOGINMAINAPI = "/api/puesto";
export const getPuestos = ( token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/getAll`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
}