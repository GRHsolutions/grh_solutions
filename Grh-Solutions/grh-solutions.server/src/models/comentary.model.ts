import { model, Schema, Types } from "mongoose";

const commentarySchema = new Schema({
  id: { type: Number, required: true },
  comment: { type: String, required: true },
  madeBy: { type: Types.ObjectId, required: true, ref: "users" },
  fromNew: { type: Types.ObjectId, required: true, ref: "news"}
});

export const CommentaryModel = model("commentary", commentarySchema);