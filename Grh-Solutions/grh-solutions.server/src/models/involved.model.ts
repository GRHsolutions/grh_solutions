import { Schema, Types, model } from "mongoose";

const involvedSchema = new Schema(
  {
    requestId: {
      type: Types.ObjectId,
      ref: "solicitudes",
      required: true,
      index: true,
    },
    profileId: {
      type: Types.ObjectId,
      ref: "profile",
      required: true,
      index: true,
    },
    assignedBy: {
      type: Types.ObjectId,
      ref: "profile",
      required: false,
    },
    role: {
      type: String,
      enum: ["editor", "lector", "peticionante"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const InvolvedModel = model("involved", involvedSchema);
