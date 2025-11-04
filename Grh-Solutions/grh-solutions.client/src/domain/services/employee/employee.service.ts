import axios, { AxiosPromise } from "axios";
const employees_API = "/api/empleados";

export const getEmployees = (token: string) => {
    const url = `${employees_API}/getAll`;
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};