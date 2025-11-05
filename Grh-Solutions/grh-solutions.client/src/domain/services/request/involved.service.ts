import { Involved } from "../../models/request/involved.entities";
import { http } from "../../../infrastructure/axios/axios";

export class InvolvedService {
  static async getByRequestId(requestId: string): Promise<Involved[]> {
    // Sin desestructurar data, axios aquí ya devuelve el tipo que pusiste
    return await http.get<Involved[]>("/api/involved/getByRequestId", {
      params: { requestId },
    }) as unknown as Involved[]; // fuerza el tipo al array de Involved
  }

  static async getById(id: string): Promise<Involved> {
    return await http.get<Involved>("/api/involved/getById", {
      params: { id },
    }) as unknown as Involved; // fuerza el tipo Involved
  }
}
