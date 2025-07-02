import fs from "fs";
import path from "path";

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
};
