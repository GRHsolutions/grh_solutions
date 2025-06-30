import { TypeContractModel } from "../models/typeContract.model";

export const typeContractService = {
    create: async (entity: object) => {
        return await TypeContractModel.create(entity);
    },
    update: async (id: string, entity: object) => {
        return await TypeContractModel.findByIdAndUpdate(id, entity, { new: true });
    },
    delete: async (id: string) => {
        return await TypeContractModel.findByIdAndDelete(id);
    },
    getAll: async () => {
        return await TypeContractModel.find();
    },
}