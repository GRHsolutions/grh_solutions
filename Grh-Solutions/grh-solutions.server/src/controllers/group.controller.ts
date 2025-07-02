import { Response, Request } from "express";
import { groupService } from "../services/group.service";

export const groupController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const {
        name
      } = req.query;

      console.log(name)

     const data = await groupService.getAll({name: name as string | undefined});

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression
      });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      if (name == "") {
        return res.status(400).json({
          message: "No hay nombre para el grupo",
        });
      }

      const data = await groupService.create({
        name: name,
      });

      return res.status(201).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || id == "" || typeof id !== "string") {
        return res.status(400).json({
          message: "No se ha proporcionado un ID para el grupo",
        });
      }

      const data = await groupService.delete(id);

      if (!data) {
        return res.status(404).json({
          message: "Grupo no encontrado",
        });
      }

      return res.status(200).json({
        message: "Grupo eliminado correctamente",
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },

  deleteUserFromGroup: async (req: Request, res: Response) => {
    try {
      const { groupId, userId } = req.query;

      if (!groupId || groupId == "" || typeof groupId !== "string") {
        return res.status(400).json({
          message: "No se ha proporcionado un ID para el grupo",
        });
      }

      if (!userId || userId == "" || typeof userId !== "string") {
        return res.status(400).json({
          message: "No se ha proporcionado un ID para el usuario",
        });
      }

      const data = await groupService.deleteUserFromGroup(groupId, userId);

      if (!data) {
        return res.status(404).json({
          message: "Grupo no encontrado",
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
};
