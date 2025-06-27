import { Schema, Types, model } from "mongoose";

const cvSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    secondLastName: {
        type: String,
        required: false
    },
    mail: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    postal:{
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    bornDate: {
        type: Date,
        required: false,
    },
    myDescription: { 
        type: String,
        required: false,
    },
    photo: { // use base64;
        type: String,
        required: false,
    },
    fromUser: {
        type: Types.ObjectId,
        ref: "users", // Relacion con el modelo de usuarios
        required: false,
    }
}, { timestamps: true });




export const cvModel = model('cv', cvSchema);