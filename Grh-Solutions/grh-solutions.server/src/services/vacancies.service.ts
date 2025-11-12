import { VacanciesFiler } from "../filters/vacancies.filter";
import { VacanciesModel } from "../models/vacancies.model";

export const vacanciesService = {
  create: async (entity: object) => {
    return await VacanciesModel.create(entity);
  },

  getAll: async (filter: { tittle?: string; isRemoto?: string }) => {
    const query: any = {};

    if (filter.tittle && filter.tittle.trim() !== "") {
      query.tittle = { $regex: filter.tittle, $options: "i" };
    }

    if (filter.isRemoto && filter.isRemoto.trim() !== "") {
      query.type_modality = { $regex: filter.isRemoto, $options: "i" };
    }

    return await VacanciesModel.find(query)
      .populate("charge")
      .populate("area")
      .sort({ createdAt: -1 });
  },

  getTotalPages: async (filter: VacanciesFiler) => {
    const query: any = {};

    if (filter.tittle && filter.tittle.trim() !== "") {
      query.tittle = { $regex: filter.tittle, $options: "i" };
    }

    const totalRow = filter.totalRow || 10;
    const totalDocuments = await VacanciesModel.countDocuments(query);

    return Math.ceil(totalDocuments / totalRow);
  },

  getPaginated: async (filter: VacanciesFiler) => {
    const query: any = {};

    if (filter.tittle && filter.tittle.trim() !== "") {
      query.tittle = { $regex: filter.tittle, $options: "i" };
    }

    const currentPage = filter.currentPage || 1;
    const totalRow = filter.totalRow || 10;
    const skip = (currentPage - 1) * totalRow;

    return await VacanciesModel.find(query)
      .skip(skip)
      .limit(totalRow)
      .populate("charge")
      .populate("area")
      .sort({ createdAt: -1 });
  },

  getById: async (id: string) => {
    return await VacanciesModel.findById(id)
      .populate("charge")
      .populate("area");
  },

  update: async (id: string, entity: object) => {
    return await VacanciesModel.findByIdAndUpdate(id, entity, { new: true });
  },

  delete: async (id: string) => {
    return await VacanciesModel.findByIdAndDelete(id);
  },
};
