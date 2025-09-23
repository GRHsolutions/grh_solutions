import { model, Schema, Types } from "mongoose";

export const dragNDropSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  base64: { type: String, required: true }
}, { _id: false });

const rawFormularySchema = new Schema(
  {
    description: { type: String, required: true },
    marked: { type: Boolean, default: false },
  },
  { _id: false }
);

const formularySchema = new Schema(
  {
    id: { type: Number, required: true },
    form: [rawFormularySchema],
  },
  { _id: false }
);

const newsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    images: [dragNDropSchema],
    formulary: formularySchema,
    status: {
      type: String,
      enum: ["deleted", "shown"],
      required: true,
    },
    type: {
      type: String,
      enum: [
        "simple-publication",
        "publication-with-images",
        "publication-with-survey",
      ],
      required: true,
    },
    numberLikes: { type: Number, default: 0 },
    numberDisLikes: { type: Number, default: 0 },
    madeBy: { type: Types.ObjectId, required: true, ref: "users" },
  },
  { timestamps: true }
);

export const NewsModel = model("news", newsSchema);
