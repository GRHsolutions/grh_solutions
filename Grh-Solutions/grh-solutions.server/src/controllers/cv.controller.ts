import { Response, Request } from "express";
import { cvService } from "../services/cv.service";
import { CVModel } from "../models/cv.model";

export const cvController = {
  create: async (req: Request, res: Response) => {
    try {
      const rq = new CVModel(req.body);
      const id = req.userId;

      if (!id || id == "" || typeof id !== "string") {
        return res.status(400).json({
          message: "No se ha proporcionado un ID de usuario",
        });
      }

      const data = await cvService.create(rq);

      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
  edit: async (req: Request, res: Response) => {
    try {
      const rq = new CVModel(req.body);
      const { id } = req.query;

      if (!id || id == "" || typeof id !== "string") {
        return res.status(400).json({
          message: "No se ha proporcionado un ID de cv",
        });
      }

      const data = await cvService.update(id, rq);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
};
