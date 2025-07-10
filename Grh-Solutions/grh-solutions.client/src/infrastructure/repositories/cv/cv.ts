import { Cv } from "../../../domain/models/Cv/cv.entities";
import { http } from "../../axios/axios";
import { ICvRepository } from "../../interfaces/cv/ICv";

const ApiConnection = "/api/cv";

export class CVRepository implements ICvRepository {
  async getMyCv(profile?: string): Promise<Cv | null> {
    const response = await http.get<Cv | null>(ApiConnection + "/getMyCv", {
      profile: profile,
    });
    return response;

  }
  async submit(entity: Cv): Promise<{data: Cv, message: string}> {
    return await http.post<{data: Cv, message: string}>(ApiConnection + "/", entity);
  }
}
