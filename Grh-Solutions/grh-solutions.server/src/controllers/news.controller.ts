import { Response, Request } from "express";
import { NewsModel } from "../models/new.model";
import { newsFilter } from "../filters/news.filter";
import { newsService } from "../services/news.service";

export const newsController = {
  create: async (req: Request, res: Response) => {
    try {
      const entity = new NewsModel(req.body);
      const cre = await newsService.create({ ...entity, status: "shown" });

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
};
