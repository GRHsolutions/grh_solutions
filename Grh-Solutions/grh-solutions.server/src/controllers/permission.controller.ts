import { Response, Request } from "express";
import { permissionService } from "../services/permissions.services";
import { Pagination } from "../filters/pagination.filters";
import { rolModel } from "../models/rol.model";

export const permissionController = {
  get: async (req: Request, res: Response) => {
    const filter = req.query as Pagination;
    const list = await permissionService.getAll(filter);

    return res.status(200).json(list);
  },

  getPagination: async (req: Request, res: Response) => {
    const filter = req.query as Pagination;
    const pagination = await permissionService.getPaginated(filter);

    return res.status(200).json(pagination);
  },

  create: async (req: Request, res: Response) => {
    const created = await permissionService.create(req.body);

    return res.status(200).json(created);
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await permissionService.update(id, req.body);

    return res.status(200).json(updated);
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await permissionService.delete(id);

    return res.status(200).json(deleted);
  },

  getUrsPermissions: async (req: Request, res: Response) => {
    try {
      const { currentRol } = req; // viene del middleware o JWT
      const { idents } = req.body; // [{ method, originalUrl }]

      if (!currentRol || !Array.isArray(idents)) {
        return res.status(400).json({
          success: false,
          message: "Debe enviar el rol y una lista de idents válidos.",
        });
      }

      // 1️⃣ Obtener permisos del rol con módulos poblados
      const role = await rolModel.findById(currentRol).populate({
        path: "permissions",
        populate: {
          path: "ident.module",
          select: "name disabled", // solo lo necesario
        },
      });

      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Rol no encontrado.",
        });
      }

      const rolePermissions = role.permissions || [];

      // 2️⃣ Armar lista de respuestas
      const results = idents.map((ident: any) => {
        const foundPermission = rolePermissions.find((perm: any) => {
          const match =
            perm.ident?.method === ident.method &&
            perm.ident?.originalUrl === ident.originalUrl;

          // si coincide pero el módulo está desactivado, no lo cuenta
          const moduleDisabled = perm.ident?.module?.disabled === true;

          return match && !moduleDisabled;
        });

        return {
          ident,
          granted: !!foundPermission,
        };
      });

      // 3️⃣ Devolver resultado
      return res.json({
        success: true,
        permissions: results,
      });
    } catch (error) {
      console.error("Error en getUrsPermissions:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener permisos del rol.",
        error: error instanceof Error ? error.message : error,
      });
    }
  },
};
