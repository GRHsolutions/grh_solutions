import { Schema, model, Types } from "mongoose";

const reportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    request: {
      type: Types.ObjectId,
      ref: "requests",  
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "users",      
      required: true,
    },
  },
  { timestamps: true }  
);

export const ReportModel = model("reports", reportSchema);
