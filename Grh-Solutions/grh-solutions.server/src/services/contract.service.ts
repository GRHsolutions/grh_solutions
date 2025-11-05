import { contractModel } from "../models/contract.model";
import { ContractFilter } from "../filters/contract.filter";

export const contractService = {
  // Crear contrato
  create: async (entity: {
    perfil_creador: string;
    perfil_empleado: string;
    eps: string;
    estrato: number;
    start_date: Date;
    end_date?: Date | null;
    tipo_contrato: string;
    arl: string;
    firma_empleado?: string | null;
    firma_empleador?: string | null;
    estado?: string;
    title: string;
    vacante: string;
  }) => {
    return await contractModel.create(entity);
  },

  // Obtener todos los contratos con relaciones
  getAll: async () => {
    return await contractModel
      .find()
      .populate("perfil_creador")
      .populate("perfil_empleado")
      .populate("tipo_contrato")
      .populate("vacante");
  },

  // Obtener contrato por ID
  getById: async (id: string) => {
    return await contractModel
      .findById(id)
      .populate("perfil_creador")
      .populate("perfil_empleado")
      .populate("tipo_contrato")
      .populate("vacante");
  },

  // Actualizar contrato
  update: async (
    id: string,
    entity: Partial<{
      perfil_creador: string;
      perfil_empleado: string;
      eps: string;
      estrato: number;
      start_date: Date;
      end_date?: Date | null;
      tipo_contrato: string;
      arl: string;
      firma_empleado?: string | null;
      firma_empleador?: string | null;
      estado?: string;
      title: string;
      vacante: string;
    }>
  ) => {
    return await contractModel.findByIdAndUpdate(id, entity, { new: true });
  },

  // Eliminar contrato
  delete: async (id: string) => {
    return await contractModel.findByIdAndDelete(id);
  },

  // Filtro dinámico
findByFilter: async (filters: ContractFilter) => {
  const query: any = {};

  if (filters.title)
    query.title = { $regex: filters.title, $options: "i" };

  if (filters.estado)
    query.estado = filters.estado;

  if (filters.perfil_empleado)
    query.perfil_empleado = filters.perfil_empleado;

  if (filters.perfil_creador)
    query.perfil_creador = filters.perfil_creador;

  if (filters.tipo_contrato)
    query.tipo_contrato = filters.tipo_contrato;

  if (filters.vacante)
    query.vacante = filters.vacante;

  if (filters.eps)
    query.eps = filters.eps;

  if (filters.arl)
    query.arl = filters.arl;

  if (filters.estrato)
    query.estrato = filters.estrato;

  // Rango de fecha inicio
  if (filters.start_date_from || filters.start_date_to) {
    query.start_date = {};
    if (filters.start_date_from) query.start_date.$gte = new Date(filters.start_date_from);
    if (filters.start_date_to) query.start_date.$lte = new Date(filters.start_date_to);
  }

  // Rango de fecha fin
  if (filters.end_date_from || filters.end_date_to) {
    query.end_date = {};
    if (filters.end_date_from) query.end_date.$gte = new Date(filters.end_date_from);
    if (filters.end_date_to) query.end_date.$lte = new Date(filters.end_date_to);
  }

  return await contractModel
    .find(query)
    .populate("perfil_creador")
    .populate("perfil_empleado")
    .populate("tipo_contrato")
    .populate("vacante");
},
};
