import { get } from 'http';
import { permissionModel } from '../models/permission.model';


export const permissionService = {
  getBasicUser: async (entity: object) => {
    return await permissionModel.create(entity);
  }
}