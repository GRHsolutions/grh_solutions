import axios, { AxiosPromise } from "axios"

const LOGINMAINAPI = "/api/cv";
export const getMyCv = (id?: string, token?: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/getMyCv?profile=${id}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
}

