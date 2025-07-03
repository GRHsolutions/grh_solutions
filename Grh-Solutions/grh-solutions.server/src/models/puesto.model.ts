import {Schema, model} from 'mongoose';

const puestoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
}, {timestamps: true});

export const puestoModel = model('puesto', puestoSchema);