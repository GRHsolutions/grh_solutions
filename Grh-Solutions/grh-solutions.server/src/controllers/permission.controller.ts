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
        const {
            method, url, module, description
        } = req.body;

        const created = await permissionService.create({method, url, module, description});

        return res.status(200).json(created);
    }
};