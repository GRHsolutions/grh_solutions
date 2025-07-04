import axios, { AxiosPromise } from "axios"

const LOGINMAINAPI = "/api/area";
export const getAreas = ( token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/getAllNoPage`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
}