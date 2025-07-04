import { Schema, Types, model } from "mongoose";

const cvSchema = new Schema( // ES CONTRACT SCHEMA NO CV
  {
    empleados: { // SE RELACIONA A UN EMPLEADO, DE ESTA FORMA CUANDO SE VENZA EL CONTRATO SE CAMBIA EL ESTADO AL EMPLEADO
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
      ref: "type_contract", // Relacion con el modelo de tipo contrato
      required: true,
    },
    status: { 
      type: String, // los estados son "POR REVISAR" "APROBADO" "REPROBADO" "POR FIRMAR" "FIRMADOS" "POR RENOVAR"
      required: true,
    },
    signatures: { // NO HACE FALTA UNA RELACION A OTRA TABLA
      type: Types.ObjectId,
      ref: "signatures", // Relacion con el modelo de asignacion
      required: false,
    },
  },
  { timestamps: true }
);

export const contractModel = model("contract", cvSchema);
