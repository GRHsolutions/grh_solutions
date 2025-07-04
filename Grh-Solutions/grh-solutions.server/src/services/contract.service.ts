import { contractModel } from "../models/contract.model";
import { contractFilter } from "../filters/contract.filter";

export const contractService = {
  // Crear contrato
  create: async (entity: {
    empleados: string;
    tittle: string;
    description: string;
    content: string;
    type_contract: string;
    status: string;
    signatures?: string;
  }) => {
    return await contractModel.create(entity);
  },

  // Obtener todos los contratos con poblaciones
  getAll: async () => {
    return await contractModel
      .find()
      .populate("empleados")
      .populate("type_contract")
      .populate("signatures");
  },

  // Obtener por ID
  getById: async (id: string) => {
    return await contractModel
      .findById(id)
      .populate("empleados")
      .populate("type_contract")
      .populate("signatures");
  },

  // Actualizar contrato
  update: async (
    id: string,
    entity: Partial<{
      empleados: string;
      tittle: string;
      description: string;
      content: string;
      type_contract: string;
      status: string;
      signatures?: string;
    }>
  ) => {
    return await contractModel.findByIdAndUpdate(id, entity, { new: true });
  },

  // Eliminar contrato
  delete: async (id: string) => {
    return await contractModel.findByIdAndDelete(id);
  },

  // Filtro dinámico
  findByFilter: async (filters: contractFilter) => {
    const query: any = {};

    if (filters.tittle) query.tittle = { $regex: filters.tittle, $options: "i" };
    if (filters.description) query.description = { $regex: filters.description, $options: "i" };
    if (filters.content) query.content = { $regex: filters.content, $options: "i" };
    if (filters.status) query.status = filters.status;

    return await contractModel
      .find(query)
      .populate("empleados")
      .populate("type_contract")
      .populate("signatures");
  },
};
