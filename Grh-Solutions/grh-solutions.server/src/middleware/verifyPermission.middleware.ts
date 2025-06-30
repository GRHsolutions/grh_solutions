import { NextFunction, Request, Response } from "express";
import { rolModel } from "../models/rol.model";

export const verifyPermissionHandler = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { method, originalUrl, currentRol } = req;

      if (!currentRol) {
        return res.status(401).json({
          success: false,
          message: "User role not found in request.",
        });
      }

      // Buscar rol con permisos poblados
      const rol = await rolModel.findById(currentRol).populate({
        path: "permissions",
        populate: {
          path: "ident.module",
          match: { disabled: false },
        },
      });

      if (!rol || !rol.isActive) {
        return res.status(403).json({
          success: false,
          message: "Role is not active or does not exist.",
        });
      }

      // Verificar si alguno de los permisos del rol coincide con el método y URL
      const hasPermission = rol.permissions.some((permission: any) =>
        permission.ident.method === method.toUpperCase() &&
        permission.ident.originalUrl === originalUrl &&
        permission.ident.module // módulo está activo
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions.",
          requested: {
            method,
            originalUrl,
          },
        });
      }

      next();
    } catch (error: any) {
      console.error("Permission validation error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error validating permissions.",
        error: error.message,
      });
    }
  };
};
