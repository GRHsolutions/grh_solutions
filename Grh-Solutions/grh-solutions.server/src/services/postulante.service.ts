import { postulantesModel } from "../models/postulante.model";

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
    return await postulantesModel
      .find({ vacante: vacanteId })
      .populate("user")
  },
};
