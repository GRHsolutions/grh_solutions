import { ScheduleTypeModel } from "../models/scheduleType.model";
import { scheduleTypeFilter } from "../filters/scheduleType.filter";

export const scheduleTypeService = {
  create: async (entity: {
    name: string;
    startTime: string;  
    endTime: string;   
  }) => {
    return ScheduleTypeModel.create(entity);
  },
  getAll: async (filter: scheduleTypeFilter) => {
    const query: any = {};
    if (filter.name && filter.name.trim() !== "") {
      query.name = new RegExp(filter.name.trim(), "i");
    }
    return ScheduleTypeModel.find(query);
  },
  getById: async (id: string) => {
    return ScheduleTypeModel.findById(id);
  },
  update: async (
    id: string,
    entity: { name?: string; startTime?: string; endTime?: string }
  ) => {
    return ScheduleTypeModel.findByIdAndUpdate(id, entity, { new: true });
  },
  delete: async (id: string) => {
    return ScheduleTypeModel.findByIdAndDelete(id);
  },
};
