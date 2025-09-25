import {
  NewsFilter,
  News,
  NewForm,
  Birthday,
} from "../../../domain/models/news/news.entities";
import { Pagination } from "../../../domain/models/pagination/pagination";
import { http } from "../../axios/axios";
import { INewRepository } from "../../interfaces/news/INews";

const ApiConnection = "/api/news";

export class NewRepository implements INewRepository {
  async get(
    filter: NewsFilter,
    signal: AbortSignal
  ): Promise<{ data: News[]; totalPages: number }> {
    const response = await http.get<{ data: News[]; totalPages: number }>(
      ApiConnection + "/",
      filter,
      signal
    );
    return response;
  }
  async getPagination(filter: any): Promise<Pagination> {
    const response = await http.get<Pagination>(
      ApiConnection + "/getPagination",
      filter
    );
    return response;
  }
  async create(object: NewForm): Promise<News> {
    const response = await http.post<News>(ApiConnection + "/", object);
    return response;
  }
  async getBirths(
    signal?: AbortSignal
  ): Promise<Birthday[]> {
    const reponse = await http.get<Birthday[]>(ApiConnection + "/births", signal);
    return reponse;
  }
}
