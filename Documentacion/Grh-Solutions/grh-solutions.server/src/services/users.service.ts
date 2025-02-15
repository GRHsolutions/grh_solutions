import { UsuarioModel } from '../models'; // Asegúrate de que la ruta sea correcta
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userService = {
  getAll: async (filter: any) => {
    if (Object.keys(filter).length === 0) {
      // Si no se le envía algún parámetro, se hará la petición para obtener todos los usuarios
      return await UsuarioModel.find();
    }
    // Si hay un parámetro por buscar (ej. correo), se hará la petición con ese parámetro
    return await UsuarioModel.find({ correo: filter.correo });
  },

  create: async (entity: object) => {
    return await UsuarioModel.create(entity);
  },

  update: async (id: string, body: object) => {
    return await UsuarioModel.findByIdAndUpdate(id, body, { new: true })
  },

  delete: async (id: string) => {
    return await UsuarioModel.findByIdAndDelete(id);
  },

  login: async (correo: string, contraseña: string) => {
    const user = await UsuarioModel.findOne({ correo })

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña)

    if (!isMatch) {
      throw new Error('Contraseña incorrecta')
    }
    const userObject = user.toObject() as any
    
    delete userObject.contraseña

    const token = jwt.sign({ id: user._id, correo: user.correo }, 'mi_secreto', {
      expiresIn: '1h',
    })

    return {  user: userObject, token }
  }

}
