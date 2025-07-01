import axios, { AxiosPromise } from "axios"

const LOGINMAINAPI = "/api/typeDocuments";
export const getTypeDocuments = (): AxiosPromise => {
  const url = `${LOGINMAINAPI}/getAllNoPage`;
  return axios.get(url);
}