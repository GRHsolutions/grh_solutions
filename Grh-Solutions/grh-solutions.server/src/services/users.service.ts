import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/users.model';

export const userService = {
  getAll: async (filter: any) => {
    if (Object.keys(filter).length === 0) {
      return await UserModel.find();
    }
    return await UserModel.find({ email: filter.email });
  },

  create: async (entity: object) => {
    return await UserModel.create(entity);
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

    const token = jwt.sign({ id: user._id, email: user.email }, 'my_secret', {
      expiresIn: '1h',
    })

    return { user: userObject, token }
  }
}