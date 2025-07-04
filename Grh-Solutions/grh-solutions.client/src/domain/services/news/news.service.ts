import { Pagination } from "../../../../../grh-solutions.server/src/filters/pagination.filters";
import { INewRepository } from "../../../infrastructure/interfaces/news/INews";
import { NewsFilter, News } from '../../models/news/news.entities';


export class NewsService {
    constructor(private readonly repo: INewRepository) {}

    async get(filter: NewsFilter): Promise<News[]> {
        return this.repo.get(filter);
    }

    async getPagination(filter: NewsFilter): Promise<Pagination> {
        return this.repo.getPagination(filter);
    }

    async create(object: any) : Promise<any>{
        return this.repo.create(object)
    }
}