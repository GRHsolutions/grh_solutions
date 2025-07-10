import { signatureModel } from "../models/signature.model";
import { signatureFilter } from "../filters/signature.filter";

export const signatureService = {
  create: async (entity: {
    empleado: string;
    contrato: string;
    signatures: boolean;
  }) => {
    return signatureModel.create(entity);
  },

  getAll: async (filter: signatureFilter) => {
    const query: any = {};

    if (filter.empleado && filter.empleado.trim() !== "") {
      query.empleado = filter.empleado;
    }

    if (filter.contrato && filter.contrato.trim() !== "") {
      query.contrato = filter.contrato;
    }

    if (typeof filter.signatures === "boolean") {
      query.signatures = filter.signatures;
    }

    return signatureModel.find(query)
      .populate("empleado")
      .populate("contrato");
  },

  getById: async (id: string) => {
    return signatureModel.findById(id)
      .populate("empleado")
      .populate("contrato");
  },

  update: async (
    id: string,
    entity: {
      empleado?: string;
      contrato?: string;
      signatures?: boolean;
    }
  ) => {
    return signatureModel.findByIdAndUpdate(id, entity, { new: true })
      .populate("empleado")
      .populate("contrato");
  },

  delete: async (id: string) => {
    return signatureModel.findByIdAndDelete(id);
  },
};
