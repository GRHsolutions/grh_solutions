import { Response, Request } from "express";
import { CommentaryModel } from "../models/comentary.model";
import { commentaryService } from "../services/commentary.service";
import { Types } from 'mongoose';
import { CommentaryFilter } from "../filters/commentary.filter";

export const commentaryController = {
  create: async (req: Request, res: Response) => {
    try {
      const user = req.userId;
      let data = req.body;

      if(!user || typeof user != "string"){
        return res.status(400).json({
            message: "Usuario no encontrado"
        })
      }

      if(!data.fromNew ||  typeof data.fromNew != "string"){
        return res.status(400).json({
          message: "Usurios form invalido"
        })
      }

      const created = await commentaryService.create({
        comment: data.comment,
        fromNew: new Types.ObjectId(data.fromNew as string),
        madeBy : new Types.ObjectId(user)
      })

      return res.status(200).json(created);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const filter = req.query as CommentaryFilter;
      const comm = await commentaryService.getAll(filter);

      return res.status(200).json(comm)
    } catch(Error: any) {
      return res.status(500).json({
        message: Error.message ? Error.message : "Error en al momento de traer los objetos",
        inner: Error.innerExpression || "Nan",
        fromService: Error.message || "Nan",
      });
    }
  }
};
