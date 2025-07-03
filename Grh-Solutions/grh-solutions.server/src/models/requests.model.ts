import { Schema, model } from "mongoose";

const solicitudSchema = new Schema({
    user: {
        type: String,
        ref: 'users',
        required: true
    },
    created_request: {
        type: Date,
        default: Date.now,
        required: true
    },
    update_request: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pendiente', 'aprobada', 'rechazada']
    },
    type_request: {
        type: String,
        required: true
    },
    info: {
        type: String
    }
});


export const solicitudModel = model('solicitudes', solicitudSchema);
