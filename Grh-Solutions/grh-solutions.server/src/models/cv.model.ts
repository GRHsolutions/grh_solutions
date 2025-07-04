import { Schema, model, Types } from "mongoose";

// ---------------------- Skill Schema ----------------------
const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["PRINCIPIANTE", "INTERMEDIO", "BUENO", "ALTO", "EXCELENTE"],
  },
}, { _id: false });

// ---------------------- Language Schema ----------------------
const languageSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["PRINCIPIANTE", "INTERMEDIO", "BUENO", "ALTO", "FLUIDO", "A1", "A2", "B1", "B2", "C1", "C2"],
  },
}, { _id: false });

// ---------------------- Formation Schema ----------------------
const formationSchema = new Schema({
  tittle: {
    type: String,
    required: true,
    trim: true,
  },
  school: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  finished: {
    type: Boolean,
    required: true,
  },
  descroption: {
    type: String,
    trim: true,
  },
  index: {
    type: Number,
    default: 0,
  },
}, { _id: false });

// ---------------------- CV Schema ----------------------
const cvSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
    default: null,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  secondLastName: {
    type: String,
    trim: true,
    default: null,
  },
  mail: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  postal: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  birthDay: {
    type: Date,
  },
  perfil: {
    type: String,
    trim: true,
  },
  formations: {
    type: [formationSchema],
    default: [],
  },
  skills: {
    type: [skillSchema],
    default: [],
  },
  lenguages: {
    type: [languageSchema],
    default: [],
  },
});

// Exportar el modelo
export const CVModel = model("CV", cvSchema);
