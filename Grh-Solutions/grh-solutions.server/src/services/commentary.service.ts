import { CommentaryFilter } from "../filters/commentary.filter";
import { CommentaryModel } from "../models/comentary.model";

export const commentaryService = {
  create: async (entity: object) => {
    return await CommentaryModel.create(entity);
  },
  getAll: async (filter: CommentaryFilter) => {
    const query: any = {};

    if (filter.name && filter.name.trim() !== "") {
      query.name = new RegExp(filter.name.trim(), "i");
    }

    return await CommentaryModel.find(query);
  },
  getById: async (id: string) => {
    return await CommentaryModel.findById(id);
  },
  update: async (id: string, entity: object) => {
    return await CommentaryModel.findByIdAndUpdate(id, entity);
  },
  delete: async (id: string) => {
    return await CommentaryModel.findByIdAndDelete(id);
  },
};