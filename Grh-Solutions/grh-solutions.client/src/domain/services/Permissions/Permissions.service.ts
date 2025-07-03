import axios, { AxiosPromise } from "axios";

const LOGINMAINAPI = "/api/permission";

export const getPermissions = (token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/`;
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};
