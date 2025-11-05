import { TypeContractModel } from "../models/typeContract.model";

export const typeContractService = {
    create: async (entity: {
        name: string;
        description?: string;
        content?: string;
    }) => {
        return await TypeContractModel.create(entity);
    },

    update: async (id: string, entity: {
        name?: string;
        description?: string;
        content?: string;
    }) => {
        return await TypeContractModel.findByIdAndUpdate(id, entity, { new: true });
    },

    delete: async (id: string) => {
        return await TypeContractModel.findByIdAndDelete(id);
    },

    getAll: async () => {
        return await TypeContractModel.find().sort({ createdAt: -1 }); // opcional: ordena recientes primero
    },

    getById: async (id: string) => {
        return await TypeContractModel.findById(id);
    }
};
