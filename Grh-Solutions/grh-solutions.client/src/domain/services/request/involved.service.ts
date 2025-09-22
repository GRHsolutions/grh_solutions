import { Involved } from "../../models/request/involved.entities";
import { http } from "../../../infrastructure/axios/axios";

export class InvolvedService {
  static async getByRequestId(requestId: string): Promise<Involved[]> {
    return await http.get<Involved[]>("/api/involved/getByRequestId", { requestId });
  }
  static async getById(id: string): Promise<Involved> {
    return await http.get<Involved>(`/api/involved/getById/${id}`);
  }
}
