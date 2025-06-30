import { Schema, model, Types } from "mongoose";
import { permissionModel } from "./permission.model";

const rolSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: Types.ObjectId,
      ref: "permission",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

rolSchema.methods.hasPermission = function (method: string, url: string) {
  // FUNCION PARA SEGUN UN METODO O UNA URL VERIFICA SI TIENE PERMISO A ESO JAJA
  return this.permissions?.some(
    (permission: any) =>
      permission?.ident?.method === method.toUpperCase() &&
      permission?.ident?.originalUrl === url
  );
};

export const rolModel = model("rol", rolSchema);
