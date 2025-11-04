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

export const createGroup = (data: UpdateGroupDto, token: string): AxiosPromise => {    
    const url = `${GROUP_API}/create`;
    return axios.post(url, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteUserFromGroup = (groupId: string, userId: string, token: string): AxiosPromise => {
    const url = `${GROUP_API}/deleteUserFromGroup?groupId=${groupId}&userId=${userId}`;
    return axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
}