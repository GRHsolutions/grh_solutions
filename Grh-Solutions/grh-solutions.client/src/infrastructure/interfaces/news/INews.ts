import {
  Birthday,
  Commentary,
  CommentaryFilter,
  CommentaryFrom,
  NewForm,
  News,
  NewsFilter,
} from "../../../domain/models/news/news.entities";
import { Pagination } from "../../../domain/models/pagination/pagination";

export interface INewRepository {
  get(
    filter: NewsFilter,
    signal?: AbortSignal
  ): Promise<{ data: News[]; totalPages: number }>;
  getPagination(filter: any): Promise<Pagination>;
  create(object: NewForm): Promise<News>;
  getBirths(signal?: AbortSignal): Promise<Birthday[]>;
  getComments(
    filter: CommentaryFilter,
    signal?: AbortSignal
  ): Promise<{
    data: Commentary[];
    totalPages: number;
  }>;
  createComment(comm: CommentaryFrom): Promise<Commentary>;
  getById(id: string): Promise<News>;
}
