import axios, { AxiosPromise } from "axios";
import { CreateProfileDto } from "../../models/profile/profile.entities";


const PROFILE_API = "/api/profiles";

export const getProfiles = (token: string): AxiosPromise => {
  const url = `${PROFILE_API}/getAll`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getProfileById = (id: string, token: string): AxiosPromise => {
  const url = `${PROFILE_API}/getById?id=${id}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getProfileByUserId = ( token: string): AxiosPromise => {
  const url = `${PROFILE_API}/getByUserId`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createProfile = (data: CreateProfileDto, token: string): AxiosPromise => {
  const url = `${PROFILE_API}/create`;
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateProfile = (id: string, data: CreateProfileDto, token: string): AxiosPromise => {
  const url = `${PROFILE_API}/update?id=${id}`;
  return axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteProfile = (id: string, token: string): AxiosPromise => {
  const url = `${PROFILE_API}/delete?id=${id}`;
  return axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
