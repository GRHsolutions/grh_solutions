export type Pagination = {
    currentPage?: number;
    totalPages?: number;
    rowsPerPage?: number;
    useGetAllNoPage?: boolean;
    method?: string,
    url?: string,
};