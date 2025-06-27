import { Schema, model } from "mongoose";

const rolSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });


export const rolModel = model('rol', rolSchema);