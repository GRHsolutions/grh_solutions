import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/users.model';
import { rolService } from './rol.service';

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
    const user = await UserModel.findById(id).populate('typeDocument');

    if (!user) {
      throw new Error('User not found');
    };

    return user;
  },

  create: async (entity: object) => {
    const rol = await rolService.getBasicRol('Administrador');

    if(!rol){
      throw Error("No se encontro el id del rol cliente") // en el servicio debe cambiarse para que se cree si no existe :P
    }
    
    const obj = {
      ...entity,
      rol: rol._id
    }
    return await UserModel.create(obj);
  },

  update: async (id: string, body: object) => {
    return await UserModel.findByIdAndUpdate(id, body, { new: true })
  },

  delete: async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
  },

  login: async (email: string, password: string) => {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Incorrect password')
    }
    const userObject = user.toObject() as any
    
    delete userObject.password

    const token = jwt.sign({ id: user._id, email: user.email, rol: user.rol }, 'my_secret', {
      expiresIn: '1h',
    })

    return { user: userObject, token }
  }
}