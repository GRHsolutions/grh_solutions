import { Request, RequestFilter } from "../../../domain/models/request/request.entities";
import { Pagination } from "../../../domain/models/pagination/pagination";

export interface IRequestRepository {
  get(filter: RequestFilter, signal?: AbortSignal): Promise<{ data: Request[]; totalPages: number }>;
  getPagination(filter: RequestFilter): Promise<Pagination>;
  getById(id: string): Promise<Request>;
  create(object: Partial<Request>): Promise<Request>;
  update(id: string, object: Partial<Request>): Promise<Request>;
  delete(id: string): Promise<Request>;
}
