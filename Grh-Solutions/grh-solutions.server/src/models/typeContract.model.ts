import { Schema, model } from "mongoose";
const typeContractSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const TypeContractModel = model('type_contract', typeContractSchema);
