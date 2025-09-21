import { Pagination } from "../../../../../grh-solutions.server/src/filters/pagination.filters";
import { IRequestRepository } from "../../../infrastructure/interfaces/request/IRequest";
import { Request, RequestFilter } from "../../models/request/request.entities";

export class RequestService {
  constructor(private readonly repo: IRequestRepository) {}

  async get(filter: RequestFilter, signal?: AbortSignal): Promise<{ data: Request[]; totalPages: number }> {
    return this.repo.get(filter, signal);
  }

  async getPagination(filter: RequestFilter): Promise<Pagination> {
    return this.repo.getPagination(filter);
  }

  async getById(id: string): Promise<Request> {
    return this.repo.getById(id);
  }

  async create(object: Partial<Request>): Promise<Request> {
    return this.repo.create(object);
  }

  async update(id: string, object: Partial<Request>): Promise<Request> {
    return this.repo.update(id, object);
  }

  async delete(id: string): Promise<Request> {
    return this.repo.delete(id);
  }
}
