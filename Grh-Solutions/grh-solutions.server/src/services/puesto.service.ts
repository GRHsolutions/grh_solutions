import { puestoModel } from "../models/puesto.model";
import { puestoFilter } from "../filters/puesto.filter";

export const puestoService = {
    create : async (entity : object) => {
        return await puestoModel.create(entity);
    },
    getAll : async (filter: puestoFilter) => {
        const query: any = {}

        if (filter.name && filter.name.trim() !== '') {
            query.name = new RegExp(filter.name, 'i')
        }

        return await puestoModel.find(query);
    },
    getById : async (id : string) => {
        return await puestoModel.findById(id);
    },
    update : async (id : string, entity : object) => {
        return await puestoModel.findByIdAndUpdate(id, entity);
    },
    delete : async (id : string) => {
        return await puestoModel.findByIdAndDelete(id);
    }
}