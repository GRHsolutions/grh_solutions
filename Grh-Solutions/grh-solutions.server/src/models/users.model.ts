import { Schema, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { rolService } from '../services/rol.service';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  secondLastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  typeDocument: {
    type: Types.ObjectId,
    ref: 'type_documents',
    required: true
  },
  rol: {
    type: Types.ObjectId,
    ref: 'rol',
    required: false
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

export const UserModel = model('users', userSchema);