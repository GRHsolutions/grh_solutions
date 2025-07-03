import { Schema, model, Types } from "mongoose";

const profileSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User", // Referencia al usuario autenticado
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  number_phone: {
    type: Number,
    required: true
  },
  telephone: {
    type: Number,
    required: false
  },
  rh: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  type_document: {
    type: String,
    required: true
  },
  document: {
    type: Number,
    required: true,
    unique: true
  },
  vacancy_name: {
    type: String,
    required: true
  },
  date_application: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const ProfileModel = model("Profile", profileSchema);
