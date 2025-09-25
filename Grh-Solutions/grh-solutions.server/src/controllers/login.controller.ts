import { Response, Request } from "express";
import { userService } from "../services/users.service";
import { cvService } from "../services/cv.service";
import { profileService } from "../services/profile.service";

type RegisterForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  documentType: string;
  // new data
  document: string;
  birthDate: string;
};

export const loginController = {
  register: async (req: Request, res: Response) => {
    try {
      const dt = req.body as RegisterForm;

      if (dt.confirmPassword != dt.password) {
        return res.status(402).json({
          message: "Passwords do not match",
        });
      }

      const data = await userService.create(dt);
      return res.status(201).json({
        ...data,
        password: "",
        _id: "",
        rol: ""
      });
    } catch (error: any) {
      // Capturar duplicados de MongoDB
      if (error.code === 11000) {
        return res.status(409).json({
          message: `El valor para ${Object.keys(error.keyPattern)} ya existe`,
          duplicate: error.keyValue, // opcional, te da { email: "..."}
        });
      }

      res.status(400).json({
        message: error.message,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      let miss: { statusCode: number; message: string };
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const { user, token } = await userService.login(email, password);

      const countCVs = await cvService.verifyMyCvs(user._id);
      // BUSCA EL PERFIL DEL USUARIO
      const findMyProfil = await profileService.getByUserId(user._id);
      // RETURNA UN ERROR EN CASO DE QUE NO ENCUENTRE NINGUN PERFIL.
      if (!findMyProfil) {
        return res.status(400).json({
          message: "Usuario no tiene un perfil especificado",
        });
      }

      return res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
          photo: user.photo,
          rol: user.rol,
          profile: findMyProfil._id,
        },
        token: token,
        warnings:
          countCVs <= 0
            ? {
                message: "Debe crear su hoja de vida",
              }
            : undefined,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
};
