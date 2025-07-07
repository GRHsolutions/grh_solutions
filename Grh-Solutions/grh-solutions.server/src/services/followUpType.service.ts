import { followUpTypeModel } from "../models/followUpType.model";

export const followUpTypeService = {
  create: async (entity: object) => {
    return await followUpTypeModel.create(entity);
  },

  getAll: async () => {
    return await followUpTypeModel.find();
  },

  getById: async (id: string) => {
    return await followUpTypeModel.findById(id);
  },

  update: async (id: string, updates: object) => {
    return await followUpTypeModel.findByIdAndUpdate(id, updates, { new: true });
  },

  delete: async (id: string) => {
    return await followUpTypeModel.findByIdAndDelete(id);
  }
};
