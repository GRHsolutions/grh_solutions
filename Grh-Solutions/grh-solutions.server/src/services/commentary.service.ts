import { Types } from "mongoose";
import { CommentaryFilter } from "../filters/commentary.filter";
import { CommentaryModel } from "../models/comentary.model";

export const commentaryService = {
  create: async (entity: object) => {
    return await CommentaryModel.create(entity);
  },
  getAll: async (filter: CommentaryFilter) => {
    const query: any = {};

    if (filter.page == 0) {
      throw new Error("Se desconoce la pagina a la que se intenta acceder");
    }

    if (filter.limit == 0) {
      throw new Error("No hay limite presente por lo que no se procede");
    }

    if (typeof filter.new != "string" || filter.new == "") {
      throw new Error("Id new unhandled");
    }

    // 🔹 Filtro por noticia (fromNew)
    if (filter.new) {
      query.fromNew = new Types.ObjectId(filter.new);
    }

    if (filter.name && filter.name.trim() !== "") {
      query.name = new RegExp(filter.name.trim(), "i");
    }

    const skip = (filter.page - 1) * filter.limit;

    const data = await CommentaryModel.find(query)
      .populate("madeBy", "name email photo")
      .sort({ date: -1 }) // 🔹 orden descendente (más recientes primero)
      .skip(skip)
      .limit(filter.limit)
      .lean();

    const totalItems = await CommentaryModel.find(query).countDocuments();

    return {
      data,
      totalPages: Math.ceil(totalItems / filter.limit), // DEVUELVE EL TOTAL DE PAGINAS, ESTO SE USARA EN EL FEED DE NEWS
    };
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
