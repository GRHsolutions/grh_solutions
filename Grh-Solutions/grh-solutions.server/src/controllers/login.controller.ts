import { Response, Request } from 'express';
import { userService } from '../services/users.service';
import { cvService } from '../services/cv.service';

type RegisterForm = {
  'firstName': string,
  'middleName': string,
  'lastName': string,
  'secondLastName': string,
  'email': string,
  'password': string,
  'confirmPassword': string,
  'documentType': string
};

export const loginController = {
  register: async (req: Request, res: Response) => {
    try {
      const dt = req.body as RegisterForm;

      if (dt.confirmPassword != dt.password) {
        return res.status(402).json({
          message: "Passwords do not match"
        })
      };

      const data = await userService.create(dt);
      return res.status(201).json(data)
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      let miss : { statusCode: number, message: string };
      const {
        email,
        password
      } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const {
        user,
        token
      } = await userService.login(email, password);

      const countCVs = await cvService.verifyMyCvs(user.id);

      return res.status(200).json({
        user: {
          email: user.email,
          photo: user.photo,
        },
        token: token,
          warnings: countCVs <= 0 ? {
            code: 100,
            message: "Debe crear su hoja de vida"
          } : undefined
      });

    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
};