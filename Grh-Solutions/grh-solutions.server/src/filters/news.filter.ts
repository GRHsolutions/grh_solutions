import { PaginationNews } from "./pagination.filters";

export interface newsFilter extends PaginationNews {
    search: string | undefined,
    [key: string]: any
}