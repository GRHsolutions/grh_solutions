import mongoose, { Types } from 'mongoose';
import { TaskModel } from '../models'

export const taskService = {
  getAll: async (filter: any) => {
    const query: any = {
      createdBy: new mongoose.Types.ObjectId(filter.id) // Asegura que `createdBy` esté en el tipo ObjectId
    };
  
    if (filter.nombre) {
      query.nombre = filter.nombre;
    }
  
    console.log("Consulta:", query);
  
    return await TaskModel.findById(new mongoose.Types.ObjectId("673525ff05c1f74a15d9f2ed"));
  },

  getTasks: async() => {
    return await TaskModel.find();
  },

  create: async (entity: object) => {
    return await TaskModel.create(entity);
  },

  update: async (id: string, body: object) => {
    return await TaskModel.findByIdAndUpdate(id, body);
  },

  delete: async (id: string) => {
    return await TaskModel.findByIdAndDelete(id);
  },

  deleteMultipleIfIsChecked: async () => {
    return await TaskModel.deleteMany({ isChecked: true}); // delete many para eliminar varios registros
  },

  getCount: async () => {
    const query: any = {
      createdBy: new mongoose.Types.ObjectId("672a9b05e76e9ce5818ec8df") // Asegura que `createdBy` esté en el tipo ObjectId
    };
    return await TaskModel.find(query);
  }
}