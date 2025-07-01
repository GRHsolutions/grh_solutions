import {get} from "http";
import {scheduleTypeModel} from "../models/ScheduleType.model";
import {scheduleTypeFilter} from "../filters/scheduleType.filter";

export const scheduleTypeService = {
    create: async (entity: object) => {
        return await scheduleTypeModel.create(entity);
    },
    getAll: async (filter: scheduleTypeFilter) => {
        const query: any = {};
        console.log(filter.name);
        if (filter.name && filter.name.trim() !== "") {
            query.$or = [{ name: new RegExp(filter.name, "i") }]; // Busqueda insensible a mayusculas
        }
        return await scheduleTypeModel.find(query);
    },
    getById: async (id: string) => {
        return await scheduleTypeModel.findById(id);
    },
    update: async (id: string, entity: object) => {
        return await scheduleTypeModel.findByIdAndUpdate(id, entity);
    },
    delete: async (id: string) => {
        return await scheduleTypeModel.findByIdAndDelete(id);
    },
}
