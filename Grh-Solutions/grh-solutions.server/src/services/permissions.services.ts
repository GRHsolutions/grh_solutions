import { permissionModel } from "../models/permission.model";
import { Pagination } from "../filters/pagination.filters";

export const permissionService = {
  create: async (entity: any) => {
    try {
      const newPermission = await permissionModel.create(entity);

      return {
        success: true,
        message: "Permiso creado correctamente",
        data: newPermission,
      };
    } catch (error: any) {
      console.error("Error creating permission:", error);

      return {
        success: false,
        message: "Error al crear el permiso",
        error: error.message,
      };
    }
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

    console.log("get");

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

  update: async (id: string, entity: any) => {
    try {
      const updatedPermission = await permissionModel.findByIdAndUpdate(
        id,
        entity,
        { new: true }
      );

      return {
        success: true,
        message: "Permiso actualizado correctamente",
        data: updatedPermission,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Error al actualizar el permiso",
        error: error.message,
      };
    }
  },

  delete: async (id: string) => {
    try {
      const deletedPermission = await permissionModel.findByIdAndDelete(id);

      return {
        success: true,
        message: "Permiso eliminado correctamente",
        data: deletedPermission,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Error al eliminar el permiso",
        error: error.message,
      };
    }
  },
};
