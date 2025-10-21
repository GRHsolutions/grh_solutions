import fs from "fs";
import path from "path";
import { permissionModel } from "../models/permission.model";
import { Types } from "mongoose";

function normalizeUrlForPermission(url: string) {
  if (!url) return url;
  return url.split("?")[0]; // o lógica más compleja si lo deseas
}

export const permissionUtl = {
  verifyPublicAccess: async (method: string, url: string): Promise<boolean> => {
    //console.log("request to ", method, " - ", url);
    // Ruta absoluta y segura al archivo JSON
    const filePath = path.join(__dirname, "../data/appSettings.json");

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file) as { method: string; url: string }[];

    // Buscar si existe un match exacto
    const found = data.some(
      (item) =>
        item.method.toUpperCase() === method.toUpperCase() && item.url === url
    );

    return found;
  },
  getOrCreatePermission: async (
    method: string,
    originalUrl: string,
    module: string | null,
    description?: string
  ): Promise<Types.ObjectId> => {
    const normalizedMethod = method.toUpperCase();
    const normalizedUrl = normalizeUrlForPermission(originalUrl);

    try {
      const existingPermission = await permissionModel.findOne({
        "ident.method": normalizedMethod,
        "ident.originalUrl": normalizedUrl,
        "ident.module": module,
      });

      if (existingPermission) return existingPermission._id;

      const newPermission = await permissionModel.create({
        ident: {
          method: normalizedMethod,
          originalUrl: normalizedUrl,
          module,
        },
        description,
      });

      return newPermission._id;
    } catch (error) {
      console.error("Error in getOrCreatePermission:", error);
      throw new Error("Could not get or create permission.");
    }
  },
};
