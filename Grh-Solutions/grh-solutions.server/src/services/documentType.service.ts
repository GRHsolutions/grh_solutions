import { get } from 'http';
import { DocumentTypeFiler } from '../filters/documentType.filters';
import { TypeDocumentModel } from '../models/typeDocument.model';


export const documentTypeService = {
  create: async (entity: object) => {
    return await TypeDocumentModel.create(entity);
  },
 getAll: async (filter: DocumentTypeFiler) => {
    const query: any = {};

  console.log(filter.name)

    if (filter.name && filter.name.trim() !== '') {
      query.$or = [{ name: new RegExp(filter.name, 'i') }]; // Búsqueda insensible a mayúsculas
    }

    return await TypeDocumentModel.find(query);
  },
  getById: async (id: string) => {
    return await TypeDocumentModel.findById(id);
  },
  update: async (id: string, entity: object) => {
    return await TypeDocumentModel.findByIdAndUpdate(id, entity, { new: true });
  },
  delete: async (id: string) => {
    return await TypeDocumentModel.findByIdAndDelete(id);
  }
}