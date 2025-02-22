import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  segundoNombre: {
    type: String,
    required: false,
  },
  primerApellido: {
    type: String,
    required: true,
  },
  segundoApellido: {
    type: String,
    required: false,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  }
}, { timestamps: true });

usuarioSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('contraseña')) return next();

  const salt = await bcrypt.genSalt(10);
  user.contraseña = await bcrypt.hash(user.contraseña, salt);
  next();
});

export const UsuarioModel = model('usuarios', usuarioSchema);
