import { Schema, Types, model } from "mongoose";

const cvSchema = new Schema(
  {
    empleados: {
      type: Types.ObjectId,
      ref: "empleados", // Relacion con el modelo de empleados
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
      ref: "type_contract", // Relacion con el modelo de tipo contrato
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    signatures: {
      type: Types.ObjectId,
      ref: "signatures", // Relacion con el modelo de asignacion
      required: false,
    },
  },
  { timestamps: true }
);

export const contractModel = model("contract", cvSchema);
