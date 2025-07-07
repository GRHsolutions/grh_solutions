import { Schema, model, Types } from "mongoose";

const profileSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "users", // Referencia al usuario autenticado
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
    required: false
  },
  number_phone: {
    type: Number,
    required: false
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
  }
}, { timestamps: true });

export const ProfileModel = model("profile", profileSchema);
