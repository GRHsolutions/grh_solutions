import { Schema, Types, model } from "mongoose";

const contractSchema = new Schema(
  {
    empleados: {
      // Relación con empleados
      type: Types.ObjectId,
      ref: "empleados",
      required: true,
    },
    tittle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type_contract: {
      type: Types.ObjectId,
      ref: "type_contract", // Relación con tipo de contrato
      required: true,
    },
    status: {
      type: String,
      enum: [
        "activo",
        "por revisar",
        "aprobado",
        "reprobado",
        "por firmar",
        "firmado",
        "por renovar",
      ], // opcional: restricción de valores válidos
      required: true,
    },
    signatures: {
      type: Boolean, // ahora es un campo booleano
      default: false, // por defecto el contrato NO está firmado
      required: true,
    },
  },
  { timestamps: true }
);

export const contractModel = model("contract", contractSchema);
