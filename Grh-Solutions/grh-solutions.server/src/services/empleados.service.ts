import { empleadosFilter } from "../filters/empleados.filter";
import { empleadosModel } from "../models/empleados.model";

export const empleadosService = {
    create: async (entity: object) => {
        return await empleadosModel.create(entity);
    },
    getAll: async () => {
        return await empleadosModel
        .find()
        .populate('users')
        .populate('puesto')
    },

getById: async (id: string) => {
  return empleadosModel
    .findById(id)
    .populate("users")      
    .populate("puesto");
},

    update: async (id: string, entity: object) => {
        return await empleadosModel.findByIdAndUpdate(id, entity, { new: true });
    },

    delete: async (id: string) => {
        return await empleadosModel.findByIdAndDelete(id);
    },
}