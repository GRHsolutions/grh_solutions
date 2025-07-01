import { get } from "http";
import { schedulesModel } from "../models/schedules.model";
import { schedulesFilter } from "../filters/schedules.filters";

export const schedulesService = {
  create: async (entity: object) => {
    return await schedulesModel.create(entity);
  },
  getAll: async (filter: schedulesFilter) => {
    const query: any = {};
    console.log(filter.name);
    if (filter.name && filter.name.trim() !== "") {
      query.$or = [{ name: new RegExp(filter.name, "i") }]; // Busqueda insensible a mayusculas
    }
    return await schedulesModel.find(query);
  },

  getById: async (id: string) => {
    return await schedulesModel.findById(id);
  },

  update: async (id: string, entity: object) => {
    return await schedulesModel.findByIdAndUpdate(id, entity, { new: true });
  },

  delete: async (id: string) => {
    return await schedulesModel.findByIdAndDelete(id);
  },
};
