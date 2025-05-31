import { Response, Request } from 'express';
import { userService } from '../services/users.service';

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

      return res.status(200).json({
        user: {
          email: user.email,
          photo: user.photo,
        },
        token: token,
      });

    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
};