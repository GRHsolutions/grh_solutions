import { NewsFilter, News } from "../../../domain/models/news/news.entities";
import { Pagination } from "../../../domain/models/pagination/pagination";
import { http } from "../../axios/axios";
import { INewRepository } from "../../interfaces/news/INews";


const ApiConnection = "/api/news";

export class NewRepository implements INewRepository {
  async get(filter: NewsFilter): Promise<News[]> {
    const response = await http.get<News[]>(ApiConnection + "/", filter);
    return response;
  }
  async getPagination(filter: any): Promise<Pagination> {
    const response = await http.get<Pagination>(ApiConnection + "/getPagination", filter);
    return response;
  }
  create(object: any): Promise<any> {
      throw new Error("Method not implemented.");
  }
}
