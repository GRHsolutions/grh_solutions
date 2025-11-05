import { ReportModel } from "../models/report.model";
export interface ReportFilter {
  title?: string;
  user?: string;
  request?: string;
}

export const reportService = {
  getAll: async (filter: ReportFilter) => {
    const query: any = {};
    if (filter.title && filter.title.trim() !== "") {
      query.title = { $regex: filter.title, $options: "i" };
    }
    if (filter.user) query.user = filter.user;
    if (filter.request) query.request = filter.request;

    return ReportModel.find(query)
      .populate("user")     
      .populate("request")  
      .sort({ createdAt: -1 });
  },

  getById: async (id: string) => {
    return ReportModel.findById(id)
      .populate("user")
      .populate("request");
  },

  create: async (entity: {
    title: string;
    description?: string;
    user: string;
    request: string;
  }) => {
    return ReportModel.create(entity);
  },

  update: async (
    id: string,
    entity: {
      title?: string;
      description?: string;
    }
  ) => {
    return ReportModel.findByIdAndUpdate(id, entity, { new: true });
  },

  delete: async (id: string) => {
    return ReportModel.findByIdAndDelete(id);
  },
};
