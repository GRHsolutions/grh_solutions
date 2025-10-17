import { NextFunction, Request, Response } from "express";
import { rolModel } from "../models/rol.model";
import { permissionModel } from "../models/permission.model";
import { ModuleModel } from "../models/module.model";
import { Types } from "mongoose";
import { permissionUtl } from "../utls/permission.utl";

export const verifyPermissionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { method, originalUrl, currentRol, isPublic } = req;

    if (isPublic) return next();

    if (!currentRol) {
      return res.status(401).json({
        success: false,
        message: "User role not found in request.",
      });
    }

    // Buscar el rol con permisos
    const rol = await rolModel.findById(currentRol).populate({
      path: "permissions",
      populate: {
        path: "ident.module",
        model: "module",
      },
    });

    if (!rol) {
      return res.status(403).json({
        success: false,
        message: "Role does not exist.",
      });
    }

    if (!rol.isActive) {
      return res.status(403).json({
        success: false,
        message: "Role is not active.",
      });
    }
    let foundPermission: any | null = null;
    // Verificar si el rol tiene el permiso correspondiente
    foundPermission = rol.permissions?.find(
      (perm: any) =>
        perm.ident?.method === method.toUpperCase() &&
        perm.ident?.originalUrl === originalUrl
    );

    let hasPermission = !!foundPermission;

    if (typeof rol.name != "string") {
      return res.status(500).json({
        success: false,
        message: "Role is not found",
      });
    }

    // ⚙️ Si no lo tiene y es admin, crear y asignar automáticamente
    if (!hasPermission && rol.name?.toLowerCase() === "admin") {
      console.log(
        `🧩 Asignando permiso automático a rol admin -> ${method} ${originalUrl}`
      );

      const permissionId: Types.ObjectId =
        await permissionUtl.getOrCreatePermission(
          method,
          originalUrl,
          null,
          `Auto-created permission for ${method} ${originalUrl}`
        );

      // Agregarlo al rol si no existe
      if (
        !rol.permissions.some(
          (p: any) => p._id?.toString() === permissionId.toString()
        )
      ) {
        rol.permissions.push(permissionId);
        await rol.save();
        console.log("✅ Permiso agregado automáticamente al rol admin");
      }

      // Obtener el permiso completo con módulo
      foundPermission = (await permissionModel
        .findById(permissionId)
        .populate("ident.module")) as any;

      hasPermission = true;
    }

    // 🧱 Si el permiso existe y tiene un módulo, verificar si está deshabilitado
    if (foundPermission && foundPermission.ident?.module) {
      const moduleData = foundPermission.ident.module as any;

      if (moduleData?.disabled) {
        return res.status(403).json({
          success: false,
          message: "El módulo que intentas ingresar está desactivado.",
          module: moduleData.name,
        });
      }
    }

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions.",
        requested: {
          method: method.toUpperCase(),
          originalUrl,
        },
      });
    }

    return next();
  } catch (error: any) {
    console.error("Permission validation error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error validating permissions.",
      error: error.message,
    });
  }
};
