import {Response, Request} from 'express'
import {taskService} from '../services'
import { TaskFilter } from '../filters/taskFilter';

export const taskController = {
  getAllTask: async (filter?: any) => {
    console.log("Filtros getall ", filter)
      return await taskService.getAll(filter);
  },

  getTasks: async() => {
    return await taskService.getTasks();
  },
  

  create: async(id: string, task: object)=>{
    const newTask = {
      createdBy: id,
      ...task
    }
    try {
      return await taskService.create(newTask);
    } catch (error:any) {
      throw error;
    }
  },

  update: async(req:Request, res:Response)=>{
    try {
      const {id} = req.params;
      const data = await taskService.update(id, req.body);
      return res.json(data);
    } catch (error:any) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  delete: async(req:Request, res:Response)=>{
    try {
      const {id} = req.params;
      const data = await taskService.delete(id);
      return res.json(data);
    } catch (error:any) {
      res.status(400).json({
        message: error.message
      })
    }
  },

  deleteAllChecked: async (req: Request, res: Response) => {
    try {

      // Llamar al servicio para eliminar múltiples tareas
      const result = await taskService.deleteMultipleIfIsChecked();
      return res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  pageInfo: async (req: Request, res: Response) => {
    try {

      // Llamar al servicio para eliminar múltiples tareas
      const result = await taskService.getCount();
      return res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
}