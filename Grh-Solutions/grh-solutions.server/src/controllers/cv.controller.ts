import { Response, Request } from "express";
import { cvService } from "../services/cv.service";
import { CVModel } from "../models/cv.model";
import { Types } from "mongoose";
import { ProfileModel } from "../models/profile.model";
import { UserModel } from "../models/users.model";

export const cvController = {
  create: async (req: Request, res: Response) => {
    try {
      const id = req.userId;
      console.log("from user", id);
      console.log("-------------------------------------")
      console.log("request: ", req.body);

      if (!id || id == "" || typeof id !== "string") {
        return res.status(400).json({
          message: "No se ha proporcionado un ID de usuario",
        });
      }
      let rq = new CVModel({ ...req.body, fromUser: id });
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
  getMyCv: async (req: Request, res: Response) => {
    try {
      const { profile } = req.query;

      if (!profile || typeof profile !== "string") {
        return res.status(400).json({
          message: "No se ha proporcionado un ID de perfil válido",
        });
      }

      const myProfile = await ProfileModel.findById(profile).populate("user");

      if (!myProfile || !myProfile.user) {
        return res.status(404).json({
          message: "Perfil no encontrado o sin usuario asociado",
        });
      }

      const userDoc = new UserModel(myProfile.user);
      console.log(userDoc);
      console.log(userDoc.id)
      const data = await cvService.getMyCvs(userDoc.id);

      if (!data) {
        return res.status(404).json({
          message: "No se encontró el CV",
        });
      }

      return res.status(200).json(data);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
        innerExpression: err.innerExpression,
      });
    }
  },
};
