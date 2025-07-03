import { Response, Request } from "express";
import { CommentaryModel } from "../models/comentary.model";
import { commentaryService } from "../services/commentary.service";
import { Types } from 'mongoose';

export const commentaryController = {
  create: async (req: Request, res: Response) => {
    try {
      const user = req.userId;
      let data = new CommentaryModel(req.body);

      if(!user || typeof user != "string"){
        return res.status(400).json({
            message: "Usuario no encontrado"
        })
      }

      const created = await commentaryService.create({
        ...data,
        madeBy : new Types.ObjectId(user)
      })

      return res.status(200).json(created);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
       
    } catch(err) {

    }
  }
};
