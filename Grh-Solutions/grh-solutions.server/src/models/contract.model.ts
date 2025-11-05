import { Schema, Types, model } from "mongoose";

const contractSchema = new Schema(
  {
    perfil_creador: {
      type: Types.ObjectId,
      ref: "profile",
      required: true,
    },

    perfil_empleado: {
      type: Types.ObjectId,
      ref: "profile",
      required: true,
    },

    eps: {
      type: String,
      enum: [
        "Nueva EPS",
        "Sanitas",
        "Sura",
        "Compensar",
        "Salud Total",
        "Coomeva",
        "Medimás",
        "Mutual Ser",
        "Capresoca",
        "Famisanar",
      ],
      required: true,
    },

    estrato: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6],
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    end_date: {
      type: Date,
      default: null,
    },

    tipo_contrato: {
      type: Types.ObjectId,
      ref: "type_contract",
      required: true,
    },

    arl: {
      type: String,
      enum: [
        "Sura",
        "Bolívar",
        "Colmena",
        "Positiva",
        "Equidad",
        "Mapfre",
      ],
      required: true,
    },

    firma_empleado: {
      type: String, // USAR: URL o base64 de la imagen
      default: null,
    },

    firma_empleador: {
      type: String, // USAR: URL o base64 de la imagen
      default: null,
    },

    estado: {
      type: String,
      enum: [
        "borrador",
        "por revisar",
        "aprobado",
        "por firmar",
        "firmado",
        "activo",
        "vencido",
        "cancelado",
      ],
      default: "borrador",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    vacante: {
      type: Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },
  },
  { timestamps: true }
);

export const contractModel = model("contract", contractSchema);
