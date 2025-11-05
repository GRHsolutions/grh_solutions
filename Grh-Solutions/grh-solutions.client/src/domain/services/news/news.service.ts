import { Pagination } from "../../../../../grh-solutions.server/src/filters/pagination.filters";
import { INewRepository } from "../../../infrastructure/interfaces/news/INews";
import {
  NewsFilter,
  News,
  NewForm,
  Birthday,
  CommentaryFilter,
  Commentary,
  CommentaryFrom,
} from "../../models/news/news.entities";

export class NewsService {
  constructor(private readonly repo: INewRepository) {}

  async get(
    filter: NewsFilter,
    signal?: AbortSignal
  ): Promise<{ data: News[]; totalPages: number }> {
    return this.repo.get(filter, signal);
  }

  async getPagination(
    filter: NewsFilter
  ): Promise<Pagination> {
    return this.repo.getPagination(filter);
  }

  async create(
    object: NewForm
  ): Promise<News> {
    return this.repo.create(object);
  }

  async getBirths(
    signal?: AbortSignal
  ): Promise<Birthday[]> {
    return this.repo.getBirths(signal);
  }

  async getComments(
    filter: CommentaryFilter,
    signal?: AbortSignal
  ): Promise<{
    data: Commentary[];
    totalPages: number;
  }> {
    return this.repo.getComments(filter, signal);
  }

  async createComment(
    comm: CommentaryFrom
  ): Promise<Commentary> {
    return this.repo.createComment(comm);
  }

  async getById(
    id: string
  ): Promise<News> {
    return this.repo.getById(id);
  }

  async delete(
    id: string
  ): Promise<{ 
    conf: News; 
    message: string 
  }> {
    return this.repo.delete(id);
  }

  async edit(
    id: string, 
    m: NewForm
  ) : Promise<News> {
    return this.repo.edit(id, m)
  }
}
