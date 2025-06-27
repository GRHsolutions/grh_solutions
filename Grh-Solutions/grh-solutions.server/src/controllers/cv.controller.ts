import { Response, Request } from 'express';
import { cvService } from '../services/cv.service';

export const cvController = {
  create: async (req: Request, res: Response) => {
    try {
      const rq = req.body;
      const id = req.userId;

      if(!id || id == "" || typeof id !== 'string') {
        return res.status(400).json({
          message: "No se ha proporcionado un ID de usuario"
        });
      }

      const data = await cvService.create(rq);

      return res.status(200).json(data)
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        innerExpression: error.innerExpression
      });
    }
  }
};