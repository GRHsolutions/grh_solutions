import { Response, Request } from "express";
import { cvService } from "../services/cv.service";
import { CVModel } from "../models/cv.model";
import { Types } from "mongoose";
import { ProfileModel } from "../models/profile.model";
import { UserModel } from "../models/users.model";

export const cvController = {
  createOrUpdate: async (req: Request, res: Response) => {
    try {
      const id = req.userId;
      console.log("from user", id);
      console.log("-------------------------------------");
      console.log("request: ", req.body);

      if (!id || typeof id !== "string" || id.trim() === "") {
        return res.status(400).json({
          message: "No se ha proporcionado un ID de usuario",
        });
      }

      const userHasCvs = await cvService.verifyMyCvs(id); // devuelve cantidad

      const bd = req.body;

      if (userHasCvs > 0 && bd._id) {
        console.log("El usuario tiene una hoja de vida, va a actualizarla");
        const updated = await cvService.update(bd._id, bd);
        return res.status(200).json({data: updated, message: "Hoja de vida actualizada"});
      } else {
        console.log("El usuario no tiene CV, va a crear uno nuevo");
        const rq = new CVModel({
          ...bd,
          fromUser: id,
        });
        const created = await cvService.create(rq);
        return res.status(200).json({data: created, message: "Hoja de vida creada"});
      }
    } catch (error: any) {
      console.log(error)

      return res.status(400).json({
        message: error.message || "Error en la operación",
        innerExpression: error.innerExpression || null,
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
        const idUser = req.userId;
        console.log(idUser);  
        if (!idUser) {
          return res.status(200).json(null);
        }
        // si no tiene ningun profile en el query va a devolver el profile del usuario logeado por el token
        const data = await cvService.getMyCvs(idUser);

        if (!data) {
          return res.status(200).json(null);
        }
        return res.status(200).json(data);
      }

      const myProfile = await ProfileModel.findById(profile).populate("user");

      if (!myProfile || !myProfile.user) {
        return res.status(404).json({
          message: "Perfil no encontrado o sin usuario asociado",
        });
      }

      const userDoc = new UserModel(myProfile.user);
      const data = await cvService.getMyCvs(userDoc.id);

      if (!data) {
        return res.status(200).json({ message: "Perfil no tiene cv" });
      }

      return res.status(200).json(data);
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
        innerExpression: err.innerExpression,
      });
    }
  },
};
