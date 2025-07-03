import { empleadosFilter } from "../filters/empleados.filter";
import { empleadosModel } from "../models/empleados.model";

export const empleadosService = {
    create: async (id: string, puesto: string) => {
        return await empleadosModel.create({
            user: id,
            puesto: puesto,
            status: "activo"
        });
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
        return await empleadosModel.findByIdAndUpdate(id,
            { status: "eliminado" }, // cambia el estado
            { new: true });
    },
}