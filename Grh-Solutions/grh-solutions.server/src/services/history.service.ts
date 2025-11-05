// services/history.service.ts
import { historyModel } from "../models/history.model";

export const historyService = {
  create: async (data: object) => {
    try {
      const doc = await historyModel.create(data);
      console.log("[historyService] create OK:", doc._id?.toString());
      return doc;
    } catch (err) {
      console.error("[historyService] create ERROR:", err);
      throw err; // re-lanzar para que el calling code lo pueda ver
    }
  },

  getAllByRequestId: async (requestId: string) =>
    historyModel.find({ requestId }).populate("profileId").sort({ createdAt: -1 }),

  getById: async (id: string) => historyModel.findById(id).populate("profileId"),
};
