import { RequestModel } from "../models/requests.model";
import { requestTypeFilter } from "../filters/requests.filter";

export const requestsService = {
  create: (data: object) => RequestModel.create(data),

  getAll: (filter: requestTypeFilter) => {
    const query: any = {};

    if (filter.title) query.title = new RegExp(filter.title, "i");
    if (filter.status) query.status = filter.status;
    if (filter.type_request) query.type_request = filter.type_request;

    return RequestModel.find(query).populate("createdBy", "-password");
  },

  getById: (id: string) =>
    RequestModel.findById(id).populate("createdBy", "-password"),
  update: (id: string, body: object) =>
    RequestModel.findByIdAndUpdate(id, body, { new: true }),
  delete: (id: string) =>
    RequestModel.findByIdAndUpdate(id, { status: "eliminada" }, { new: true }), // baja lógica
};
