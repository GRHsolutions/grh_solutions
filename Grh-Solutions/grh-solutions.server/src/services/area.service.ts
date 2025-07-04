import { areaModel } from "../models/area.model";
import { areaFilter } from "../filters/area.filter";

export const areaService = {
  create: async (entity: object) => {
    return await areaModel.create(entity);
  },
  getAll: async (filter: areaFilter) => {
    const query: any = {};

    if (filter.name && filter.name.trim() !== "") {
      query.name = new RegExp(filter.name.trim(), "i");
    }

    return await areaModel.find(query);
  },
  getById: async (id: string) => {
    return await areaModel.findById(id);
  },
  update: async (id: string, entity: object) => {
    return await areaModel.findByIdAndUpdate(id, entity);
  },
  delete: async (id: string) => {
    return await areaModel.findByIdAndDelete(id);
  },
};
