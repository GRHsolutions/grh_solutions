import { Schema, model } from "mongoose";

const typeContractSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    content: {
        type: String,
        required: false
        // Aquí puede ir texto largo, incluso HTML o contenido de editor
    }
}, { timestamps: true });

export const TypeContractModel = model("type_contract", typeContractSchema);
