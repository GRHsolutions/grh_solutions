import { get } from "http";
import { NewsModel } from "../models/new.model";
import { newsFilter } from "../filters/news.filter";
import { Pagination } from "../filters/pagination.filters";

export const newsService = {
  getAll: async (filter: newsFilter) => {
    const query: any = {
      status: "shown",
    };

    if (filter.search && filter.search.trim() !== "") {
      const regex = new RegExp(filter.search, "i"); // Usamos filter.search, no filter.name
      query.$or = [{ title: regex }, { description: regex }];
    }

    // Si NO se requiere paginación
    if (filter.useGetAllNoPage) {
      return await NewsModel.find(query);
    }

    // Si se requiere paginación
    if (!filter.currentPage || !filter.rowsPerPage) return;

    const skip = (filter.currentPage - 1) * filter.rowsPerPage;

    const data = await NewsModel.find(query)
      .skip(skip)
      .limit(filter.rowsPerPage);

    return data;
  },
  create: async (entity: object) => {
    return NewsModel.create(entity);
  },
  getPagination: async (filter: newsFilter) => {
    const query: any = {
      status: "shown",
    };

    if (filter.search && filter.search.trim() !== "") {
      const regex = new RegExp(filter.search, "i"); // Usamos filter.search, no filter.name
      query.$or = [{ title: regex }, { description: regex }];
    }

    const totalItems = await NewsModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / (filter.rowsPerPage || 1));

    return {
      currentPage: filter.currentPage || 1,
      rowsPerPage: filter.rowsPerPage || 10,
      totalPages,
      totalItems,
    } as Pagination;
  },
};
