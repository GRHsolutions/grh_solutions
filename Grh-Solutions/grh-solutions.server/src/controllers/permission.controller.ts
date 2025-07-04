import { Response, Request } from 'express';
import { permissionService } from '../services/permissions.services';
import { Pagination } from '../filters/pagination.filters';

export const permissionController = {
    get: async (req: Request, res: Response) => {
        const filter = req.query as Pagination;
        const list = await permissionService.getAll(filter);

        return res.status(200).json(list);
    },

    getPagination: async(req: Request, res: Response) => {
        const filter = req.query as Pagination;
        const pagination = await permissionService.getPaginated(filter);

        return res.status(200).json(pagination);
    },

    create: async(req: Request, res: Response) => {

        const created = await permissionService.create(req.body);

        return res.status(200).json(created);
    },

    update: async(req: Request, res: Response) => {
        const { id } = req.params;
        const updated = await permissionService.update(id, req.body);

        return res.status(200).json(updated);
    },

    delete: async(req: Request, res: Response) => {
        const { id } = req.params;
        const deleted = await permissionService.delete(id);

        return res.status(200).json(deleted);
    }
};