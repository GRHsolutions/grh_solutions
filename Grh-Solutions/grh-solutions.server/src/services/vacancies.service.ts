import { VacanciesFiler } from "../filters/vacancies.filter";
import { VacanciesModel } from "../models/vacancies.model";

export const vacanciesService = {
  create: async (entity: object) => {
    return await VacanciesModel.create(entity);
  },
  getAll: async (filter: any) => {
    if (Object.keys(filter).length === 0) {
      return await VacanciesModel.find();
    }
    return await VacanciesModel.find({ tittle: filter.tittle });
  },
  getTotalPages: async (filter: VacanciesFiler) => {
    const query: any = {};

    if (filter.name && filter.name.trim() !== "") {
      query.$or = [{ name: new RegExp(filter.name, "i") }];
    }

    const totalRow = filter.totalRow || 10;
    const totalDocuments = await VacanciesModel.countDocuments(query);

    return Math.ceil(totalDocuments / totalRow);
  },
  getPaginated: async (filter: VacanciesFiler) => {
    const query: any = {};

    if (filter.name && filter.name.trim() !== "") {
      query.$or = [{ name: new RegExp(filter.name, "i") }];
    }

    const currentPage = filter.currentPage || 1;
    const totalRow = filter.totalRow || 10;
    const skip = (currentPage - 1) * totalRow;

    return await VacanciesModel.find(query)
      .skip(skip)
      .limit(totalRow);
  },
  getById: async (id: string) => {
    return await VacanciesModel.findById(id);
  },
  update: async (id: string, entity: object) => {
    return await VacanciesModel.findByIdAndUpdate(id, entity, { new: true });
  },
  delete: async (id: string) => {
    return await VacanciesModel.findByIdAndDelete(id);
  },
};
