import { Schema, model } from "mongoose";

const solicitudSchema = new Schema({
    /* 
     1.llamar variable como createdBy ya que aqui es una referencia al usurio quien creo la solicitud
     2. cuando se crea una solicitud, se crea un campo en la tabla involved, aqui se hace una refenrencia de este mismo usuario y guardarlo como peticionante
     3. usar timestamp en vez de created_request y update_request
     4. que es info dx
     5. se manejan asignaciones a la solicitud por lo tanto cada uusarios en involved se manejaria como "asignated to" "was asignated" "creator" "mentioned", reunirce con juan por dudas :V
     6.
    */
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
