import { Schema, model } from "mongoose";

const typeDocumentSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const TypeDocumentModel = model('type_documents', typeDocumentSchema);