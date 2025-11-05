import { get } from "http";
import { rolModel } from "../models/rol.model";
import { RolFiler } from "../filters/rol.filter";
import { Types } from "mongoose";

export const rolService = {
  create: async (entity: object) => {
    return await rolModel.create(entity);
  },
  getAll: async (filter: RolFiler) => {
    const query: any = {};
    const orConditions: any[] = [];
    let projection: any = { _id: 1, name: 1 }; // proyección por defecto (sin permisos)

    if (filter.name && filter.name.trim() !== "") {
      orConditions.push({ name: new RegExp(filter.name.trim(), "i") }); // búsqueda insensible a mayúsculas
    }

    if (filter.id && filter.id.trim() !== "") {
      try {
        const trueId = new Types.ObjectId(filter.id.trim());
        orConditions.push({ _id: trueId });
        // si llega ID, agregamos los permissions a la proyección
        projection = { _id: 1, name: 1, permissions: 1 };
      } catch (err) {
        console.warn("ID inválido:", filter.id);
      }
    }

    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    return await rolModel.find(query, projection);
  },

  getById: async (id: string) => {
    return await rolModel.findById(id).populate("permissions");
  },

  update: async (id: string, entity: object) => {
    return await rolModel.findByIdAndUpdate(id, entity, { new: true });
  },

  delete: async (id: string) => {
    return await rolModel.findByIdAndDelete(id);
  },

  getBasicRol: async (term: string) => {
    return await rolModel.findOne({
      name: term,
    });
  },

  // ADDED: Method to add permissions to a role
  addPermissionToRole: async (roleId: string, permissionId: string) => {
    return await rolModel.findByIdAndUpdate(
      roleId,
      { $addToSet: { permissions: permissionId } },
      { new: true }
    );
  },

  // ADDED: Method to remove permission from role
  removePermissionFromRole: async (roleId: string, permissionId: string) => {
    return await rolModel.findByIdAndUpdate(
      roleId,
      { $pull: { permissions: permissionId } },
      { new: true }
    );
  },
};
