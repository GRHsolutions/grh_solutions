import { PaginationNews } from "./pagination.filters";

export interface CommentaryFilter extends PaginationNews {
    search: string | undefined;
    new: string;
    [key: string] : any
}