import { TypeDocumentModel } from '../models/typeDocument.model';

export const documentService = {
  create: async (entity: object) => {
    return await TypeDocumentModel.create(entity);
  },
}