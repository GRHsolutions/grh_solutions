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
  // Método para obtener lista paginada (filtrada opcionalmente)
  // getPaginated: async (filter: RolFiler) => {
  //   const query: any = {};

  //   if (filter.name && filter.name.trim() !== '') {
  //     query.$or = [{ name: new RegExp(filter.name, 'i') }];
  //   }

  //   const currentPage = filter.currentPage || 1;
  //   const totalRow = filter.totalRow || 10;
  //   const skip = (currentPage - 1) * totalRow;

  //   return await rolModel
  //     .find(query)
  //     .skip(skip)
  //     .limit(totalRow);
  // },

  // Método para obtener total de páginas según filtro y totalRow
  // getTotalPages: async (filter: RolFiler) => {
  //   const query: any = {};

  //   if (filter.name && filter.name.trim() !== '') {
  //     query.$or = [{ name: new RegExp(filter.name, 'i') }];
  //   }

  //   const totalRow = filter.totalRow || 10;
  //   const totalDocuments = await rolModel.countDocuments(query);

  //   return Math.ceil(totalDocuments / totalRow);
  // },

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