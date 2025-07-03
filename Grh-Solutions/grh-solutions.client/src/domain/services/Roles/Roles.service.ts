import axios, { AxiosPromise } from "axios";
import { CreateRolDto, UpdateRolDto } from "../../models/role/role.entities";

const LOGINMAINAPI = "/api/rol";

export const getRoles = (name?: string, token?: string): AxiosPromise => {
  let url = `${LOGINMAINAPI}/getAllNoPage`;
  if (name) {
    url += `?name=${name}`;
  }
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateRol = (id: string, data: UpdateRolDto, token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/update?id=${id}`;
  return axios.put(url, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteRol = (id: string, token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/delete?id=${id}`;
  return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const createRol = (data: CreateRolDto, token: string): AxiosPromise => {
  const url = `${LOGINMAINAPI}/create`;
  return axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
};
