import { http } from "../../../infrastructure/axios/axios";
import {
  Permission,
  PermissionsFilter,
} from "../../models/permission/permission.entities";
import {
  CreateRolDto,
  Rol,
  UpdateRolDto,
} from "../../models/role/role.entities";

const LOGINMAINAPI = "/api/rol";
const PERMISSIONSAPI = "/api/permission";

// ESTOS METODOS SON PROPIOS PARA ACCEDER A UN USUARIO CON
// PERMISOS DE ALTO RANGO POR ESO SE HACE UN OVERWRITE PARA ASI
// HACER ENTENDER AL BACKEND QUE TODO ESTO PERTENECE A ESE MODULO JEJE
const overWrite = {
  "x-module": "Admin-Interface",
};

export const getAllRoles = async (): Promise<
  {
    _id: string;
    name: string;
  }[]
> => {
  let url = `${LOGINMAINAPI}/getAllNoPage`;
  return await http.get<
    {
      _id: string;
      name: string;
    }[]
  >(url, undefined, undefined, overWrite);
};

export const updateRol = async (
  id: string,
  data: UpdateRolDto
): Promise<Rol> => {
  const url = `${LOGINMAINAPI}/update?id=${id}`;
  return await http.put<Rol>(url, data, overWrite);
};

export const deleteRol = async (id: string): Promise<boolean> => {
  const url = `${LOGINMAINAPI}/delete?id=${id}`;
  return await http.delete<boolean>(url, overWrite);
};

export const createRol = async (data: CreateRolDto): Promise<Rol> => {
  const url = `${LOGINMAINAPI}/create`;
  return await http.post<Rol>(url, data, overWrite);
};

export const getPermissions = async (
  filter: PermissionsFilter
): Promise<Permission[]> => {
  const url = `${PERMISSIONSAPI}/`;
  return await http.get<Permission[]>(url, filter, undefined, overWrite);
};

export const getPermissionsPagination = async (
  filter: PermissionsFilter
): Promise<{
  totalPages: number;
}> => {
  const url = `${PERMISSIONSAPI}/getPagination`;
  return await http.get<{
    totalPages: number;
  }>(url, filter, undefined, overWrite);
};

export const getPermsFromRol = async (id: string): Promise<Rol> => {
  const url = `${PERMISSIONSAPI}/getPermsFromRol`;
  return await http.get<Rol>(
    url,
    {
      id: id,
    },
    undefined,
    overWrite
  );
};
