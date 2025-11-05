import { get } from "http";
import { postulantesModel } from "../models/postulante.model";
import mongoose from "mongoose";

export const postulanteService = {
  create: async (entity: object) => {
    return await postulantesModel.create(entity);
  },
  update: async (id: string, entity: object) => {
    return await postulantesModel.findByIdAndUpdate(id, entity, { new: true });
  },
  delete: async (id: string) => {
    return await postulantesModel.findByIdAndDelete(id);
  },
  getAllByVacante: async (vacanteId: string) => {
    return await postulantesModel.find({ vacante: vacanteId }).populate("user");
  },
getAllByVacanteByUser: async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("userId inválido");
  }

  return await postulantesModel
    .find({ user: new mongoose.Types.ObjectId(userId) })
    .populate("vacante")
    .populate("user");
},

  getById: async (id: string) => {
    return await postulantesModel.findById(id).populate("user");
  },
};
