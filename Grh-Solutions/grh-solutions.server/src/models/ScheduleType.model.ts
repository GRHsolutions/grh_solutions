import { Schema,Types, model } from "mongoose";

const scheduleTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    start_Date: {
        type: Date,
        required: true
    },
    end_Date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export const scheduleTypeModel = model('schedule_types', scheduleTypeSchema);