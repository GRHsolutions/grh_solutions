import { permissionModel } from "../models/permission.model";
import { Pagination } from "../filters/pagination.filters";

export const permissionService = {
  create: async (entity: any) => {
    console.log("Creating permission with entity:", entity);

    return await permissionModel.create(entity);
  },

  getAll: async (filter: Pagination) => {
    const query: any = {};

    // Filtros dinámicos
    if (filter.method) {
      query["ident.method"] = filter.method.toUpperCase();
    }

    if (filter.url) {
      query["ident.originalUrl"] = { $regex: filter.url, $options: "i" };
    }

    // Si NO se requiere paginación
    if (filter.useGetAllNoPage) {
      return await permissionModel.find(query);
    }

    // Si se requiere paginación
    if (!filter.currentPage || !filter.rowsPerPage) return;

    const skip = (filter.currentPage - 1) * filter.rowsPerPage;

    const data = await permissionModel
      .find(query)
      .skip(skip)
      .limit(filter.rowsPerPage);

    return data;
  },

  getPaginated: async (filter: Pagination) => {
    const query: any = {};

    if (filter.method) {
      query["ident.method"] = filter.method.toUpperCase();
    }

    if (filter.url) {
      query["ident.originalUrl"] = { $regex: filter.url, $options: "i" };
    }

    const totalItems = await permissionModel.countDocuments(query);
    const totalPages = Math.ceil(totalItems / (filter.rowsPerPage || 1));

    return {
      currentPage: filter.currentPage || 1,
      rowsPerPage: filter.rowsPerPage || 10,
      totalPages,
      totalItems,
    } as Pagination;
  },
};
