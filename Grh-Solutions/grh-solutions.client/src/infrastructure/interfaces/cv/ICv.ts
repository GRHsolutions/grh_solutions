import { Cv } from "../../../domain/models/Cv/cv.entities";

export interface ICvRepository {
    getMyCv(profile?: string): Promise<Cv | null>,
    submit(entity: Cv) : Promise<{data: Cv, message: string}>;
}