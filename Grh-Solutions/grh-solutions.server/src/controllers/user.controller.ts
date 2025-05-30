import { Response, Request } from "express";
import { userService } from "../services/users.service";

export const userController = {
  getMyInfo: async (req: Request, res: Response) => {
    try {
      const { userId } = req;

      if (userId == undefined) {
        return res.status(500).json({
          message: "Internal error",
          innerExpression:
            "userId detected as undefined check the token validation",
        });
      }

      const data = await userService.getById(userId);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const { firstName, middleName, lastName, secondLastName, typeDocument } =
        req.body;

      if (!userId) {
        return res.status(500).json({
          message: "userId detected as undefined check the token validation",
        });
      }

      const updatedUser = await userService.update(userId, {
        firstName,
        middleName,
        lastName,
        secondLastName,
        typeDocument,
      });

      return res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
