import { Response, Request } from 'express';
import { rolService } from '../services/rol.service';
import { rolModel } from '../models/rol.model';

export const rolController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      if (name == "") {
        return res.status(400).json({
          message: "No hay nombre para el tipo de documento"
        })
      };

      const data = await rolService.create({
        name: name
      });

      return res.status(201).json(data)
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression
      });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const {
        name,
        id
      } = req.query;

      const data = await rolService.getAll({
        name: name as string | undefined,
        id: id as string | undefined
      });

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression
      });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const { 
        name, 
        isActive, 
        addPermissions, 
        removePermissions 
      } = req.body;

      const updates: any = {};

      if (name !== undefined) updates.name = name;
      if (isActive !== undefined) updates.isActive = isActive;

      // Primero actualiza campos simples
      const rol = await rolModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!rol) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      // Ahora actualiza permisos de forma incremental
      if (Array.isArray(addPermissions)) {
        await rolModel.findByIdAndUpdate(id, {
          $addToSet: { permissions: { $each: addPermissions } },
        });
      }

      if (Array.isArray(removePermissions)) {
        await rolModel.findByIdAndUpdate(id, {
          $pull: { permissions: { $in: removePermissions } },
        });
      }

      // Devuelve el rol actualizado con permisos expandidos si quieres
      const updated = await rolModel.findById(id).populate("permissions");
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el rol", error });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || id == "" || typeof id !== 'string') {
        return res.status(400).json({
          message: "No se ha proporcionado un ID para el tipo de documento"
        });
      }

      const data = await rolService.delete(id);

      if (!data) {
        return res.status(404).json({
          message: "Tipo de documento no encontrado"
        });
      }

      return res.status(200).json({
        message: "Tipo de documento eliminado correctamente"
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression
      });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (!id || id == "" || typeof id !== 'string') {
        return res.status(400).json({
          message: "No se ha proporcionado un ID para el tipo de documento"
        });
      }

      const data = await rolService.getById(id);

      if (!data) {
        return res.status(404).json({
          message: "Tipo de documento no encontrado"
        });
      }

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression
      });
    }
  }
};