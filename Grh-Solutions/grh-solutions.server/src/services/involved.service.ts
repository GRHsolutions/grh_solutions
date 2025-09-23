import { InvolvedModel } from "../models/involved.model";

export const involvedService = {
  create: async (entity: object) => {
    return await InvolvedModel.create(entity);
  },

  getAll: async (filter: any = {}) => {
    return await InvolvedModel.find(filter)
      .populate("requestId")
      .populate("profileId")
      .populate("assignedBy");
  },

  getById: async (id: string) => {
    return await InvolvedModel.findById(id)
      .populate("requestId")
      .populate("profileId")
      .populate("assignedBy");
  },

  getByRequestId: async (requestId: string) => {
    return await InvolvedModel.find({ requestId })
      .populate("requestId")
      .populate("profileId")
      .populate("assignedBy");
  },

  update: async (id: string, updates: object) => {
    
    return await InvolvedModel.findByIdAndUpdate(id, updates, { new: true })
      .populate("requestId")
      .populate("profileId")
      .populate("assignedBy");
  },

  delete: async (id: string) => {
    return await InvolvedModel.findByIdAndDelete(id);
  },
};
