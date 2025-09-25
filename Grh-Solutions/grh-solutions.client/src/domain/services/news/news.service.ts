import { Pagination } from "../../../../../grh-solutions.server/src/filters/pagination.filters";
import { INewRepository } from "../../../infrastructure/interfaces/news/INews";
import { NewsFilter, News, NewForm, Birthday } from '../../models/news/news.entities';


export class NewsService {
    constructor(private readonly repo: INewRepository) {}

    async get(filter: NewsFilter, signal?: AbortSignal): Promise<{data: News[], totalPages: number}> {
        return this.repo.get(filter, signal);
    }

    async getPagination(filter: NewsFilter): Promise<Pagination> {
        return this.repo.getPagination(filter);
    }

    async create(object: NewForm) : Promise<News>{
        return this.repo.create(object)
    }

    
    async getBirths(signal?: AbortSignal) : Promise<Birthday[]> {
        return this.repo.getBirths(signal);
    }
}