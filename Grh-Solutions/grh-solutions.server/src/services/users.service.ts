import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.model";
import { rolService } from "./rol.service";
import { ProfileModel } from "../models/profile.model";

export const userService = {
  getAll: async (filter: any) => {
    if (Object.keys(filter).length === 0) {
      return await UserModel.find();
    }
    return await UserModel.find({ email: filter.email });
  },

  getAllUsers: async () => {
    return UserModel.find().select("-password");
  },

  getById: async (id: string) => {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

create: async (entity: any) => {
  const rol = await rolService.getBasicRol("Administrador");

  if (!rol) {
    throw Error("No se encontró el id del rol cliente"); 
  }

  const obj = new UserModel({
    email: entity["email"],
    password: entity["password"],
    rol: rol._id,
  });

  // primero creamos el usuario
  const createdUsr = await UserModel.create(obj);

  const createProfile = new ProfileModel({
    name: entity["firstName"] + " " + entity["middleName"],
    lastname: entity["lastName"] + " " + entity["secondLastName"],
    type_document: entity["typeDocument"],
    document: entity["document"],
    email: entity["email"],
    date_of_birth: entity["birthDate"],
    user: createdUsr._id,
    rh: false,
    status: "enabled",
    number_phone: null,
    address: null,
  });

  try {
    await ProfileModel.create(createProfile);
  } catch (error: any) {
    // 👇 si falla el profile, eliminamos el user recién creado
    await UserModel.deleteOne({ _id: createdUsr._id });
    throw error;
  }

  return createdUsr;
},

  update: async (id: string, body: object) => {
    return await UserModel.findByIdAndUpdate(id, body, { new: true });
  },

  delete: async (id: string) => {
    return await UserModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  },

  login: async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    const userObject = user.toObject() as any;

    delete userObject.password;

    const token = jwt.sign(
      { id: user._id, email: user.email, rol: user.rol },
      "my_secret",
      {
        expiresIn: "1h",
      }
    );

    return { user: userObject, token };
  },
};
