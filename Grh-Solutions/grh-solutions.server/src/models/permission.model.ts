import { Schema, Types, model } from "mongoose";

const permissionSchema = new Schema(
  {
    ident: {
      method: {
        type: String,
        required: [true, "HTTP method is required"],
        enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        uppercase: true,
      },
      originalUrl: {
        type: String,
        required: [true, "Original URL is required"],
        trim: true,
      },
      module: {
        type: Types.ObjectId,
        ref: "module",
        required: [true, "Module is required"],
      },
    },
    description: {
      type: String,
      required: [false]
    }
  },
  { timestamps: true }
);

// Índice compuesto para evitar permisos duplicados
permissionSchema.index({ 
  'ident.method': 1, 
  'ident.originalUrl': 1, 
  'ident.module': 1 
}, { unique: true });

export const permissionModel = model("permission", permissionSchema);
