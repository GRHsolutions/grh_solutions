import { model, Schema, Types } from "mongoose";

const groupSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    users: [
      {
        type: Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    area: {
      type: Types.ObjectId,
      ref: "area",
      required: true
    }
  },{timestamps: true,}
);

export const groupsModel = model("groups", groupSchema);
