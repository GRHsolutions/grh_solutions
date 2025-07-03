import { Pagination } from "./pagination.filters";

export interface CommentaryFilter extends Pagination {
    search: string | undefined;
    [key: string] : any
}