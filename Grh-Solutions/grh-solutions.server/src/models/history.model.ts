import { Schema, model, Types } from "mongoose";

const historySchema = new Schema(
  {
    id_history: {
      type: String,
      required: true,
      unique: true,
    },
    event: {
      type: String,
      required: true,
      trim: true,
    },
    user_fk: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const historyModel = model("history", historySchema);
