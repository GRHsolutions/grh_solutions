import { Response, Request } from "express";
import { NewsModel } from "../models/new.model";
import { newsFilter } from "../filters/news.filter";
import { newsService } from "../services/news.service";
import { profileService } from "../services/profile.service";
import { ProfileModel } from "../models/profile.model";
import { get } from "http";

export const newsController = {
  create: async (req: Request, res: Response) => {
    try {
      const user = req.userId;

      if (!user || typeof user != "string") {
        return res.status(400).json({
          message: "Usuario no encontrado",
        });
      }

      const { 
        type, 
        title, 
        description, 
        images 
      } = req.body;

      const cre = await newsService.create({
        type: type,
        title: title,
        description: description,
        status: "shown",
        madeBy: user,
        images: images,
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
      const rs = await newsService.getAll(filter);

      return res.status(200).json(rs);
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
      const {
        id
      } = req.query;

      if (!id || typeof id != "string" || id == "") {
        return resp.status(400).json({
          message: "Id no puede ser null o vacio",
        });
      }
      const conf = await newsService.delete(id);

      return resp.status(200).json({
        obj: conf,
        message: "Comunicado eliminado exitosamente",
      });
    } catch (Error: any) {
      return resp.status(500).json({
        message: Error.message,
        inner: Error.innerExpression,
      });
    }
  },

  edit: async (req: Request, res: Response) => {
    try {
      const {
        id
      } = req.query;
      const { 
        type, 
        title, 
        description, 
        images
      } = req.body;

      if (!id || typeof id != "string" || id == "") {
        return res.status(400).json({
          message: "Id no puede ser null o vacio",
        });
      }
      console.log(req.body);

      const ed = await newsService.edit(id, {
        type: type,
        title: title,
        description: description,
        //status: "shown",
        //madeBy: user,
        images: images,
      })

      return res.status(200).json(ed);
    } catch(error: any){
      return res.status(500).json({
        message: error.message,
        innerExpression: error.innerExpression,
      });
    }
  },
 
  getBirthDays: async (req: Request, res: Response) => {
    try {
      // Obtener la fecha actual
      const today = new Date();
      const todayMonth = today.getMonth(); // 0-11 (Enero es 0)
      const todayDate = today.getDate(); // Día del mes (1-31)

      // Buscar perfiles con cumpleaños hoy
      const profilesWithBirthday = await ProfileModel.find({
        $expr: {
          $and: [
            { $eq: [{ $month: "$date_of_birth" }, todayMonth + 1] }, // +1 porque Mongoose usa 1-12 para meses
            { $eq: [{ $dayOfMonth: "$date_of_birth" }, todayDate] },
          ],
        },
      }).select("photo name lastname email _id"); // Seleccionamos solo los campos necesarios;

      // Responder con los perfiles que cumplen años hoy
      return res.status(200).json(profilesWithBirthday);
    } catch (Error: any) {
      return res.status(500).json({
        message: Error.message,
        inner: Error.innerExpression,
      });
    }
  },

  getById: async(req: Request, res: Response) => {
    try{
      const {
        id
      } = req.query;

      if (!id || typeof id != "string" || id == "") {
        return res.status(400).json({
          message: "Id no puede ser null o vacio",
        });
      }

      const r = await newsService.getId(id);

      return res.status(200).json(r);

    } catch(Error: any){
      return res.status(500).json({
        message: Error.message,
        inner: Error.innerExpression
      })
    }
  }
};
