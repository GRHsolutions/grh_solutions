import mongoose from "mongoose";
import { RequestModel } from "../models/requests.model";

type RequestUpdateDto = {
  title?: string;
  status?: string;
  type_request?: string;
  infoDx?: string;
  file?: any;
};

export const requestsService = {
  create: async (data: any, by: string) => {
    try {
      const requestData = { ...data, createdBy: by };
      const createdObject = await RequestModel.create(requestData);
      return createdObject.toObject();
    } catch (err) {
      console.error("[requestsService.create] ERROR:", err);
      throw err;
    }
  },

  getAll: async (filter: any) => {
    try {
      const query: any = {};
      if (filter.title) query.title = new RegExp(filter.title, "i");
      if (filter.status) query.status = filter.status;
      if (filter.type_request) query.type_request = filter.type_request;

      return await RequestModel.find(query).lean();
    } catch (err) {
      console.error("[requestsService.getAll] ERROR:", err);
      throw err;
    }
  },

  getById: async (id: string) => {
    try {
      return await RequestModel.findById(id).lean();
    } catch (err) {
      console.error("[requestsService.getById] ERROR:", err);
      throw err;
    }
  },

  update: async (id: string, body: RequestUpdateDto) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;

      const allowedFields: Partial<RequestUpdateDto> = {};
      (["title", "status", "type_request", "infoDx", "file"] as (keyof RequestUpdateDto)[]).forEach(
        (key) => {
          if (body[key] !== undefined) allowedFields[key] = body[key];
        }
      );

      if (Object.keys(allowedFields).length === 0) return await RequestModel.findById(id).lean();

      return await RequestModel.findByIdAndUpdate(id, allowedFields, { new: true }).lean();
    } catch (err) {
      console.error("[requestsService.update] ERROR:", err);
      throw err;
    }
  },

  delete: async (id: string) => {
    try {
      return await RequestModel.findByIdAndUpdate(
        id,
        { status: "eliminada" },
        { new: true }
      ).lean();
    } catch (err) {
      console.error("[requestsService.delete] ERROR:", err);
      throw err;
    }
  },
};
