import { model, Schema } from "mongoose";

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
    images: [
      {
        type: String,
      },
    ],
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
    date: { type: Date, required: true },
    madeBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const NewsModel = model("news", newsSchema);
