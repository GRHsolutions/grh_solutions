import { Schema, Types, model } from "mongoose";

const empleadosSchema = new Schema({
  user:
  {
    type: Types.ObjectId,
    ref: "users",
    required: true,
    unique: true
  },
  puesto: {
    type: Types.ObjectId,
    ref: "puesto",
    required: true
  },
  status: {
    type: String, 
    enum: ["activo", "inactivo", "eliminado"],
  }
})
export const empleadosModel = model("empleados", empleadosSchema);