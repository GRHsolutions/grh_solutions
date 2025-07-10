
import { ICvRepository } from "../../../infrastructure/interfaces/cv/ICv";
import { Cv } from "../../models/Cv/cv.entities";


export class CvService {
    constructor(private readonly repo: ICvRepository) {}

    async getMyCv(profile?: string): Promise<Cv | null> {
        return this.repo.getMyCv(profile);
    }

    async submit(entity: Cv) : Promise<{data: Cv, message: string}>{
        return this.repo.submit(entity);
    }
}