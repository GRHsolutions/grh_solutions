import { Schema, Types, model } from "mongoose";

const empleadosSchema = new Schema({
  area: {
      type: Types.ObjectId,
      ref: "area",
      required: true
  },
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