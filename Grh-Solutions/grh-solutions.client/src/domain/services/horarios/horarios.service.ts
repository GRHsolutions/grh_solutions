import axios, { AxiosPromise } from "axios";
import { createHorario } from "../../models/horarios/Horarios.entities";

const schedules_API = "/api/schedules";
const users_API = "/api/user";

export const getSchedules = (token: string): AxiosPromise => {
    const url = `${schedules_API}/getAllNoPage`;
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const createSchedule = (data: createHorario, token: string): AxiosPromise => {
    const url = `${schedules_API}/create`;
    const body = {
        start_date: data.startDate,
        end_date: data.endDate,
        group: data.grupo,
        scheduleType: data.scheduleType
    }
    return axios.post(url, body, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteSchedule = (id: string, token: string): AxiosPromise => {
    const url = `${schedules_API}/delete?id=${id}`;
    return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
};  


export const updateSchedule = (id: string, data: createHorario, token: string): AxiosPromise => {
    const url = `${schedules_API}/update?id=${id}`;
    const body = {
        start_date: data.startDate,
        end_date: data.endDate,
        group: data.grupo,
        scheduleType: data.scheduleType
    }
    return axios.put(url, body, { headers: { Authorization: `Bearer ${token}` } });
};

export const getScheduleById = (id: string, token: string): AxiosPromise => {
    const url = `${schedules_API}/getById?id=${id}`;
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const getUsersAll = (token: string): AxiosPromise => {
    const url = `${users_API}/getAll`;
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};