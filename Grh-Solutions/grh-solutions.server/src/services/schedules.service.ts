import { get } from "http";
import { schedulesModel } from "../models/schedules.model";
import { schedulesFilter } from "../filters/schedules.filters";

export const schedulesService = {
  create: async (entity: {
    start_date: Date;
    end_date: Date;
    group: string;
    scheduleType: string;
  })=> {
    if (!entity.start_date || !entity.end_date || !entity.group || !entity.scheduleType) {
      throw new Error("Faltan campos obligatorios");
    }
    if (entity.start_date >= entity.end_date) {
      throw new Error("la feccha inicial no debe ser posterior a la final");
    }
    return await schedulesModel.create(entity);
  },
  getAll: async () => {
    return schedulesModel
      .find()               
      .populate("group")    
      .populate("scheduleType");
  },

  getById: async (id: string) => {
    return await schedulesModel.findById(id).populate("group").populate("scheduleType");
  },

  update: async (id: string, entity: Partial<{
    start_date: Date;
    end_date: Date;
    group: string;
    scheduleType: string;
  }>) => {
    return await schedulesModel.findByIdAndUpdate(id, entity, { new: true });
  },

  delete: async (id: string) => {
    return await schedulesModel.findByIdAndDelete(id);
  },
};
