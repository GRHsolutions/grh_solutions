import fs from "fs";
import path from "path";
import { permissionModel } from "../models/permission.model";
import { Types } from "mongoose";

export const permissionUtl = {
  verifyPublicAccess: async (method: string, url: string): Promise<boolean> => {
    console.log('request to ', method, " - ", url);
    // Ruta absoluta y segura al archivo JSON
    const filePath = path.join(__dirname, "../data/appSettings.json");

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file) as { method: string; url: string }[];

    // Buscar si existe un match exacto
    const found = data.some(
      (item) =>
        item.method.toUpperCase() === method.toUpperCase() &&
        item.url === url
    );

    return found;
  },
  getOrCreatePermission: async (method: string, originalUrl: string, module: string | null, description?: string):Promise<Types.ObjectId> => {
    const normalizedMethod = method.toUpperCase();

  try {
    // Buscar si ya existe
    const existingPermission = await permissionModel.findOne({
      'ident.method': normalizedMethod,
      'ident.originalUrl': originalUrl,
      'ident.module': module,
    });

    if (existingPermission) {
      return existingPermission._id;
    }

    // Crear nuevo permiso
    const newPermission = await permissionModel.create({
      ident: {
        method: normalizedMethod,
        originalUrl,
        module,
      },
      description,
    });

    return newPermission._id;
  } catch (error) {
    console.error("Error in getOrCreatePermission:", error);
    throw new Error("Could not get or create permission.");
  }
  }
};
