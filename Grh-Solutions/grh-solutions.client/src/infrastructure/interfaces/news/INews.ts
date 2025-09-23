import { Birthday, NewForm, News, NewsFilter } from "../../../domain/models/news/news.entities";
import { Pagination } from "../../../domain/models/pagination/pagination";

export interface INewRepository {
    get(filter: NewsFilter, signal?: AbortSignal): Promise<{data: News[], totalPages: number}>;
    getPagination(filter: any): Promise<Pagination>;
    create(object: NewForm): Promise<News>;
    getBirths(signal: AbortSignal): Promise<Birthday[]>
}