import { History } from "../../models/request/history.entities";

export class HistoryService {
    private baseUrl = "http://localhost:3000/api/history";
  
    async getByRequestId(requestId: string, signal?: AbortSignal): Promise<History[]> {
      const res = await fetch(`${this.baseUrl}/request/${requestId}`, { signal });
      if (!res.ok) throw new Error("Error al obtener historial");
      return res.json();
    }
  
    async getById(id: string): Promise<History> {
      const res = await fetch(`${this.baseUrl}/${id}`);
      if (!res.ok) throw new Error("Error al obtener historial por ID");
      return res.json();
    }
  }