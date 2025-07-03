import { model, Schema, Types } from "mongoose";

const commentarySchema = new Schema({
  id: { type: Number, required: true },
  comment: { type: String, required: true },
  madeBy: { type: Types.ObjectId, required: true }
});

export const CommentaryModel = model("Commentary", commentarySchema);