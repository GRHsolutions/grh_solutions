import { Schema, Types, model } from "mongoose";

const empleadosSchema = new Schema ({
    users: [
      {
        type: Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    puesto: {
      type: Types.ObjectId,
      ref: "puesto",
      required: true
    }
}, {timestamps: true,}
)
export const empleadosModel = model("empleados", empleadosSchema);