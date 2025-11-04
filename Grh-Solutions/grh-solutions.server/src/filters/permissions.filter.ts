import { Pagination } from "./pagination.filters";

export interface PermissionsFilter extends Pagination {
    url?: string,
    method?: string
};
