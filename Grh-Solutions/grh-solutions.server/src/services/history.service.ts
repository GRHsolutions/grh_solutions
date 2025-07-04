import { historyModel } from "../models/history.model";

export const historyService = {
  create: async (entity: object) => {
    return await historyModel.create(entity);
  },

  getAll: async () => {
    return await historyModel.find().populate("user_fk");
  },

  getById: async (id: string) => {
    return await historyModel.findById(id).populate("user_fk");
  },

  delete: async (id: string) => {
    return await historyModel.findByIdAndDelete(id);
  }
};
