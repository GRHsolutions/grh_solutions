import { Pagination } from "./pagination.filters";

export interface newsFilter extends Pagination {
    search: string | undefined,
    [key: string]: any
}