import {scheduleTypeModel} from "../models/scheduleType.model";
import {scheduleTypeFilter} from "../filters/scheduleType.filter";

export const scheduleTypeService = {
  create: async (entity: {
    name: string;
    start_Date: Date;
    end_Date: Date;
  }) => {
    return scheduleTypeModel.create(entity);
  },

    getAll: async (filter: scheduleTypeFilter) => {
        const query: any = {};
    if (filter.name && filter.name.trim() !== "") {
      query.name = new RegExp(filter.name.trim(), "i");
    }
    return scheduleTypeModel.find(query);
  },
    getById: async (id: string) => {
        return await scheduleTypeModel.findById(id);
    },
  update: async (
    id: string,
    entity: { name?: string; start_Date?: Date; end_Date?: Date }
  ) => scheduleTypeModel.findByIdAndUpdate(id, entity, { new: true }),
    delete: async (id: string) => {
        return await scheduleTypeModel.findByIdAndDelete(id);
    },
}
