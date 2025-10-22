import { model, Schema, Types } from "mongoose";

const commentarySchema = new Schema({
  comment: { type: String, required: true },
  madeBy: { type: Types.ObjectId, required: true, ref: "users" },
  fromNew: { type: Types.ObjectId, required: true, ref: "news"}
}, {
  timestamps: true
});

export const CommentaryModel = model("commentary", commentarySchema);