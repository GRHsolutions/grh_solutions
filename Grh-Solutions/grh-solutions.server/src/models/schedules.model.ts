import { Schema, Types, model } from "mongoose";

const schedulesSchema = new Schema(
  {
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    group: {
      type: Types.ObjectId,
      ref: "groups",
      required: true,
    },
    ScheduleType: {
      type: Types.ObjectId,
      ref: "schedule_types",
      required: true,
    },
  },
  { timestamps: true }
);

export const schedulesModel = model("schedules", schedulesSchema);
