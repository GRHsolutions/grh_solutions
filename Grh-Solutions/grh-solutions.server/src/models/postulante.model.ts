import { Schema, model } from "mongoose";

const postulantesSchema = new Schema({
  user: {
    type: String,
    ref: 'users',
    required: true
  },
  vacante: {
    type: String,
    ref: 'Vacancy',
    required: true
  },
  application_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

export const postulantesModel = model('postulantes', postulantesSchema);
