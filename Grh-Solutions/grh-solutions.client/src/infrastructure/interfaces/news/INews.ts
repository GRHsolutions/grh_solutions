import { News, NewsFilter } from "../../../domain/models/news/news.entities";
import { Pagination } from "../../../domain/models/pagination/pagination";

export interface INewRepository {
    get(filter: NewsFilter): Promise<News[]>;
    getPagination(filter: any): Promise<Pagination>;
    create(object: any): Promise<any>;
}