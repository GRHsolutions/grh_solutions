export type Pagination = {
    currentPage?: number;
    totalPages?: number;
    rowsPerPage?: number;
    useGetAllNoPage?: boolean;
};

export type PaginationNews = {
    page: number,
    limit: number
}