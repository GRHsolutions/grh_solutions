import { get } from 'http';
import { rolModel } from '../models/rol.model';
import { RolFiler } from '../filters/rol.filter';


export const rolService = {
  create: async (entity: object) => {
    return await rolModel.create(entity);
  },
 getAll: async (filter: RolFiler) => {
    const query: any = {};

  console.log(filter.name)

    if (filter.name && filter.name.trim() !== '') {
      query.$or = [{ name: new RegExp(filter.name, 'i') }]; // Búsqueda insensible a mayúsculas
    }

    return await rolModel.find(query);
  },
  getById: async (id: string) => {
    return await rolModel.findById(id);
  },
  update: async (id: string, entity: object) => {
    return await rolModel.findByIdAndUpdate(id, entity, { new: true });
  },
  delete: async (id: string) => {
    return await rolModel.findByIdAndDelete(id);
  }
}