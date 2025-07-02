import {Schema, model} from 'mongoose';

const areaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
}, {timestamps: true});

export const areaModel = model('area', areaSchema);