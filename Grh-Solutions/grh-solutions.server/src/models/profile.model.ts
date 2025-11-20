import { Schema, model, Types } from "mongoose";
import { dragNDropSchema } from "./new.model";

const profileSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "users", // Referencia al usuario autenticado
    required: true,
    unique: true
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
    required: false
  },
  number_phone: {
    type: String,
    required: false
  },
  telephone: {
    type: String,
    required: false
  },
  rh: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["disabled", "enabled"],
    required: true
  },
  type_document: {
    type: Types.ObjectId,
    ref: 'type_documents',
    required: true,
  },
  document: {
    type: String,
    required: true,
    unique: true
  },
  signature: dragNDropSchema
}, { timestamps: true });

export const ProfileModel = model("profile", profileSchema);
