import { get } from 'http';
import { cvModel } from '../models/cv.model';


export const cvService = {
    create: async (entity: object) => {
        return await cvModel.create(entity);
    },
    verifyMyCvs: async (id: string) => {
        return await cvModel.countDocuments({
            fromUser: id
        })
    }
}