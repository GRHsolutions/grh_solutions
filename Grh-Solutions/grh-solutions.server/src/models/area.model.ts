import {Schema, model} from 'mongoose';

const areaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {timestamps: true});

export const areaModel = model('area', areaSchema);