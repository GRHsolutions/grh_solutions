import { Schema, model, Types } from "mongoose";

const vacanciesSchema = new Schema({
  tittle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type_contract: {
    type: String,
    ref: 'type_contract',
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  horary: {
    type: String,
    required: true
  },
  charge: {
    type: Types.ObjectId,
    ref: "puesto", 
    required: false
  },
  area: {
    type: Types.ObjectId,
    ref: "area",
    required: false
  },
  address: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  type_modality: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  formation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const VacanciesModel = model('Vacancy', vacanciesSchema);
