import { Schema, model } from "mongoose";

const followUpTypeSchema = new Schema(
  {
    id_type_follow_up: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    is_last_update: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

export const followUpTypeModel = model("followUpType", followUpTypeSchema);
