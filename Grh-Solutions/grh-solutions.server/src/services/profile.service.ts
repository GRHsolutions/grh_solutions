import { ProfileModel } from "../models/profile.model";
import { Types } from "mongoose";

export const profileService = {
  create: async (entity: object) => {
    return await ProfileModel.create(entity);
  },

  getAll: async (filter: any = {}) => {
    if (Object.keys(filter).length === 0) {
      return await ProfileModel.find();
    }

    const query: any = {};

    if (filter.name) {
      query.name = new RegExp(filter.name, "i"); // búsqueda insensible a mayúsculas
    }

    if (filter.document) {
      query.document = filter.document;
    }

    return await ProfileModel.find(query);
  },

  getById: async (id: string) => {
    return await ProfileModel.findById(id);
  },

  getByUserId: async (userId: string) => {
    return await ProfileModel.findOne({ user: new Types.ObjectId(userId) });
  },

  update: async (id: string, entity: object) => {
    return await ProfileModel.findByIdAndUpdate(id, entity, { new: true });
  },

  delete: async (id: string) => {
    return await ProfileModel.findByIdAndDelete(id);
  },

  getTotalPages: async (filter: any) => {
    const query: any = {};

    if (filter.name && filter.name.trim() !== "") {
      query.name = new RegExp(filter.name, "i");
    }

    const totalRow = filter.totalRow || 10;
    const totalDocuments = await ProfileModel.countDocuments(query);

    return Math.ceil(totalDocuments / totalRow);
  },

  getPaginated: async (filter: any) => {
    const query: any = {};

    if (filter.name && filter.name.trim() !== "") {
      query.name = new RegExp(filter.name, "i");
    }

    const currentPage = filter.currentPage || 1;
    const totalRow = filter.totalRow || 10;
    const skip = (currentPage - 1) * totalRow;

    return await ProfileModel.find(query)
      .skip(skip)
      .limit(totalRow);
  }
};
