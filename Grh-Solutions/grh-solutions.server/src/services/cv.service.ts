import { CVModel } from "../models/cv.model";

export const cvService = {
  create: async (entity: object) => {
    return await CVModel.create(entity);
  },
  verifyMyCvs: async (id: string) => {
    return await CVModel.countDocuments({
      fromUser: id,
    });
  },
  update: async (id: string, entity: object) => {
    const updatedCV = await CVModel.findByIdAndUpdate(id, entity, {
      new: true,
    });
    if (!updatedCV) {
      throw new Error("CV not found");
    }
    return updatedCV;
  },
  getMyCvs: async (id: string) => {
    return await CVModel.findOne({
      fromProfile: id
    });
  }
};
