import axios, { AxiosPromise } from "axios";


const PROFILE_API = "/api/user";

export const changePassword = (data: any, token: string): AxiosPromise => {
  const url = `${PROFILE_API}/changePassword`;
  return axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};