import { Response, Request } from 'express';
import { documentService } from '../services/documentType.service';

export const documentTypeController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      if (name == "") {
        return res.status(400).json({
          message: "No hay nombre para el tipo de documento"
        })
      };

      const data = await documentService.create({
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
};