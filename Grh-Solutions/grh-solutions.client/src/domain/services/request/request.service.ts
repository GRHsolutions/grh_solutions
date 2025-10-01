// RequestService.ts (frontend) — opción 1
import { Pagination } from "../../../../../grh-solutions.server/src/filters/pagination.filters";
import { IRequestRepository } from "../../../infrastructure/interfaces/request/IRequest";
import { Request, RequestFilter, RequestForm } from "../../models/request/request.entities";
import { DragNDropVariables } from "../../../generics/grh-generics/DragNDrop";

// DTO para la creación/actualización que coincide con lo que espera el backend
type CreateRequestDto = {
  title: string;
  type_request: string;
  infoDx?: string;
  // el backend espera "file" (array con la info cruda de cada archivo)
  file?: DragNDropVariables[];
  status?: Request["status"];
  [key: string]: any;
};

export class RequestService {
  constructor(private readonly repo: IRequestRepository) {}

  async get(
    filter: RequestFilter,
    signal?: AbortSignal
  ): Promise<{ data: Request[]; totalPages: number }> {
    return this.repo.get(filter, signal);
  }

  async getPagination(filter: RequestFilter): Promise<Pagination> {
    return this.repo.getPagination(filter);
  }

  async getById(id: string): Promise<Request> {
    return this.repo.getById(id);
  }

  // Recibe el RequestForm (lo que viene del formulario) y lo transforma
  async create(object: RequestForm): Promise<Request> {
    const payload: CreateRequestDto = {
      title: object.title,
      type_request: object.type_request,
      infoDx: object.infoDx,
      file: object.files, // => mapear files (frontend) -> file (backend)
      status: "pendiente",
    };

    // Cast controlado: el repo internamente sabe transformarlo al Request final
    return this.repo.create(payload as unknown as Partial<Request>);
  }

  async update(id: string, object: Partial<RequestForm>): Promise<Request> {
    const payload: Partial<CreateRequestDto> = {};
    if (object.title !== undefined) payload.title = object.title;
    if (object.type_request !== undefined) payload.type_request = object.type_request;
    if (object.infoDx !== undefined) payload.infoDx = object.infoDx;
    if (object.files !== undefined) payload.file = object.files;

    return this.repo.update(id, payload as unknown as Partial<Request>);
  }

  async delete(id: string): Promise<Request> {
    return this.repo.delete(id);
  }
}
