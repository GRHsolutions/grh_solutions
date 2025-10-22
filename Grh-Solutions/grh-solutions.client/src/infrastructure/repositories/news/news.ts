import {
  NewsFilter,
  News,
  NewForm,
  Birthday,
  CommentaryFilter,
  Commentary,
  CommentaryFrom,
} from "../../../domain/models/news/news.entities";
import { Pagination } from "../../../domain/models/pagination/pagination";
import { http } from "../../axios/axios";
import { INewRepository } from "../../interfaces/news/INews";

const ApiNewsConnection = "/api/news";
const ApiCommConnection = "/api/commentary";

export class NewRepository implements INewRepository {
  async edit(id: string, n: NewForm): Promise<News> {
    const response = await http.put<News>(`${ApiNewsConnection}/?id=${id}`, n)
    return response;
  }

  async delete(id: string): Promise<{ conf: News; message: string; }> {
    const response = await http.delete<{
      conf: News,
      message: string
    }>(
      `${ApiNewsConnection}/?id=${id}`,
    );
    return response;
  }
  
  async getById(id: string): Promise<News> {
    const response = await http.get<News>(
      ApiNewsConnection + "/getById",
      id
    );
    return response;
  }
  
  async get(
    filter: NewsFilter,
    signal: AbortSignal
  ): Promise<{ data: News[]; totalPages: number }> {
    const response = await http.get<{ data: News[]; totalPages: number }>(
      ApiNewsConnection + "/",
      filter,
      signal
    );
    return response;
  }

  async getPagination(filter: any): Promise<Pagination> {
    const response = await http.get<Pagination>(
      ApiNewsConnection + "/getPagination",
      filter
    );
    return response;
  }

  async create(object: NewForm): Promise<News> {
    const response = await http.post<News>(ApiNewsConnection + "/", object);
    return response;
  }

  async getBirths(signal?: AbortSignal): Promise<Birthday[]> {
    const reponse = await http.get<Birthday[]>(
      ApiNewsConnection + "/births",
      signal
    );
    return reponse;
  }

  async getComments(
    filter: CommentaryFilter,
    signal?: AbortSignal
  ): Promise<{
    data: Commentary[];
    totalPages: number;
  }> {
    const response = await http.get<{
      data: Commentary[];
      totalPages: number;
    }>(ApiCommConnection + "/", filter, signal);
    return response;
  }

  async createComment(comm: CommentaryFrom): Promise<Commentary> {
    const response = await http.post<Commentary>(ApiCommConnection + "/", comm);
    return response;
  }
}
