import axios, { AxiosPromise } from "axios";
import { UpdateGroupDto } from "../../models/group/group.entities";

const GROUP_API = "/api/group";

export const getGroups = (token: string): AxiosPromise => {
    const url = `${GROUP_API}/getAll`;
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const putGroup = (id: string, data: UpdateGroupDto, token: string): AxiosPromise => {
    const url = `${GROUP_API}/update?id=${id}`;
    return axios.put(url, data, { headers: { Authorization: `Bearer ${token}` } });
};

