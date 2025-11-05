import { Schema, model, Types } from "mongoose";

const historySchema = new Schema(
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
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { timestamps: false }
);

export const historyModel = model("history", historySchema);
