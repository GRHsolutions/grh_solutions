import { Response, Request } from "express";
import { groupService } from "../services/group.service";

export const groupController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { name } = req.query;

      const data = await groupService.getAll({
        name: typeof name === "string" ? name.trim() : undefined,
      });

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { name, area, users = [] } = req.body;

      if (!name || name.trim() === "") {
        return res.status(400).json({
          message: "No hay nombre para el grupo",
        });
      }

      if (!area || area.trim() === "") {
        return res.status(400).json({
          message: "El área es obligatoria",
        });
      }

      if (!Array.isArray(users)) {
        return res.status(400).json({
          message: "'users' debe ser un arreglo",
        });
      }

      const data = await groupService.create({
        name: name.trim(),
        area: area.trim(),
        users,
      });

      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({
          message: "Se debe proporcionar un ID válido para el grupo",
        });
      }

      const data = await groupService.delete(id.trim());

      if (!data) {
        return res.status(404).json({
          message: "Grupo no encontrado",
        });
      }

      return res.status(200).json({
        message: "Grupo eliminado correctamente",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  deleteUserFromGroup: async (req: Request, res: Response) => {
    try {
      const { groupId, userId } = req.query;

      if (
        !groupId ||
        typeof groupId !== "string" ||
        !userId ||
        typeof userId !== "string"
      ) {
        return res.status(400).json({
          message: "Faltan parámetros groupId o userId",
        });
      }

      const data = await groupService.deleteUserFromGroup(groupId, userId);

      if (!data) {
        return res.status(404).json({
          message: "Grupo no encontrado o usuario no pertenecía al grupo",
        });
      }

      return res.status(200).json({
        message: "Usuario eliminado del grupo correctamente",
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
update: async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const { name, userId, area } = req.body;  

    if (!id || typeof id !== "string" || id.trim() === "") {
      return res.status(400).json({ message: "ID de grupo requerido" });
    }

    if (!name && !userId && !area) {
      return res.status(400).json({
        message: "Debes enviar al menos 'name', 'userId' o 'area' para actualizar",
      });
    }
    const payload: any = {};
    if (name)    payload.name  = name.trim();
    if (userId)  payload.userId = userId.trim();   // se usará para $addToSet
    if (area)    payload.area  = area.trim();

    const data = await groupService.update(id.trim(), payload);

    if (!data) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
},
};
