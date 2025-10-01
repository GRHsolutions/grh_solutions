import { Schema,  Types, model } from "mongoose";


export const dragNDropSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  base64: { type: String, required: true }
}, { _id: false });


const solicitudSchema = new Schema({
    /* 
     1.llamar variable como createdBy ya que aqui es una referencia al usurio quien creo la solicitud
     2. cuando se crea una solicitud, se crea un campo en la tabla involved, aqui se hace una refenrencia de este mismo usuario y guardarlo como peticionante
     3. usar timestamp en vez de created_request y update_request
     4. que es info dx
     5. se manejan asignaciones a la solicitud por lo tanto cada uusarios en involved se manejaria como "asignated to" "was asignated" "creator" "mentioned", reunirce con juan por dudas :V
     6.
    */
   createdBy: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pendiente", "aprobada", "rechazada"],
      default: "pendiente",
    },
    type_request: {
      type: String,
      required: true,
      trim: true,
    },
    infoDx: {
      type: String,
      trim: true,
    },
    file: [dragNDropSchema]
}, { timestamps: true }
);


export const RequestModel  = model('solicitudes', solicitudSchema);
