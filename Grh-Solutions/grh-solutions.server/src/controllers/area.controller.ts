import { Response, Request } from 'express';
import { rolService } from '../services/rol.service';

export const areaController = {
    create : async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
    
            if (name == "") {
              return res.status(400).json({
                message: "No hay nombre para el area",
              });
            }
    
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
    getAll : async (req: Request, res: Response) => {
        try {
            const { name } = req.query;
    
            console.log(name)
    
            const data = await rolService.getAll({
              name: name as string | undefined
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
    
            if (!id || id == "" || typeof id !== 'string') {
              return res.status(400).json({
                message: "No se ha proporcionado un ID para el area"
              });
            }
    
            const { name } = req.body;
    
            if (name == "") {
              return res.status(400).json({
                message: "No hay nombre para el area"
              })
            };
    
            const data = await rolService.update(id, {
              name: name
            });
    
            return res.status(200).json(data);
          } catch (error: any) {
            res.status(400).json({
              message: error.message,
              innerExpression: error.innerExpression
            });
          }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.query;
    
            if (!id || id == "" || typeof id !== 'string') {
              return res.status(400).json({
                message: "No se ha proporcionado un ID para el area"
              });
            }
    
            const data = await rolService.delete(id);
    
            if (!data) {
              return res.status(404).json({
                message: "Area no encontrado",
              });
            }
    
            return res.status(200).json({
              message: "Area eliminado correctamente",
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
                message: "No se ha proporcionado un ID para el area"
              });
            }
    
            const data = await rolService.getById(id);
    
            if (!data) {
              return res.status(404).json({
                message: "Area no encontrado",
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
}