import { solicitudModel } from "../models/requests.model";
import { requestTypeFilter } from "../filters/requests.filter";

export const requestsService = {
  create: async (entity: object) => {
    return await solicitudModel.create(entity);
  },

  getAll: async (filter: requestTypeFilter) => {
    const query: any = {};

    if (filter.title && filter.title.trim() !== "") {
      query.title = new RegExp(filter.title, "i"); // Búsqueda insensible a mayúsculas
    }

    if (filter.status && filter.status.trim() !== "") {
      query.status = filter.status;
    }

    if (filter.type_request && filter.type_request.trim() !== "") {
      query.type_request = filter.type_request;
    }

    return await solicitudModel.find(query);
  },

  getById: async (id: string) => {
    return await solicitudModel.findById(id);
  },

  update: async (id: string, entity: object) => {
    return await solicitudModel.findByIdAndUpdate(id, entity, { new: true });
  },

  delete: async (id: string) => {
    return await solicitudModel.findByIdAndDelete(id);
  },
};
