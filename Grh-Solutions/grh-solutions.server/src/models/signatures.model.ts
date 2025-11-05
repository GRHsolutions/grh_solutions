import {Schema, Types, model} from 'mongoose';

const signatureSchema = new Schema({
    empleado: {
      type: Types.ObjectId,
      ref: "empleados", 
      required: true,
    },
    contrato: {
      type: Types.ObjectId,
      ref: "contract", // Relacion con el modelo de contrato
      required: true,
    },
    signatures: {
      type: Boolean,
      required: true,
    },
}, {timestamps: true});

export const signatureModel = model('signature', signatureSchema);
