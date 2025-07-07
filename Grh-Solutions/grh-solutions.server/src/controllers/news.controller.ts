import { Response, Request } from "express";
import { NewsModel } from "../models/new.model";
import { newsFilter } from "../filters/news.filter";
import { newsService } from "../services/news.service";

export const newsController = {
  create: async (req: Request, res: Response) => {
    try {
      const user = req.userId;

      if (!user || typeof user != "string") {
        return res.status(400).json({
          message: "Usuario no encontrado"
        })
      }
      
      const {
        type,
        title,
        description,
      } = req.body;

      const cre = await newsService.create({
        type: type,
        title: title,
        description: description,
        status: "shown",
        madeBy: user
      });

      return res.status(200).json(cre);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const filter = req.query as newsFilter;
      const items = await newsService.getAll(filter);

      return res.status(200).json(items);
    } catch (Error: any) {
      return res.status(500).json({
        message: "Error en al momento de traer los objetos",
        inner: Error.innerExpression || "Nan",
        fromService: Error.message || "Nan",
      });
    }
  },
  getPages: async (req: Request, res: Response) => {
    try {
      const filter = req.query as newsFilter;
      const pag = await newsService.getPagination(filter);

      return res.status(200).json(pag);
    } catch (Error: any) {
      return res.status(500).json({
        message: "Error en al momento de traer los objetos",
        inner: Error.innerExpression || "Nan",
        fromService: Error.message || "Nan",
      });
    }
  },
  delete: async (req: Request, resp: Response) => {
    try {
      const id = req.query;

      if (!id || typeof id != "number" || id <= 0) {
        return resp.status(400).json({
          message: 'Id no puede ser null o menor e igual a 0'
        })
      };
      const conf = await newsService.delete(id);

      return resp.status(200).json({
        obj: conf,
        message: "new borrada exitosamente"
      })
    } catch (Error: any) {
      return resp.status(500).json({
        message: Error.message,
        inner: Error.innerExpression
      })
    }
  }
};
