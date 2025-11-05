export interface Pagination {
    currentPage?: number;
    totalPages?: number;
    rowsPerPage?: number;
    useGetAllNoPage?: boolean;
}

export interface NewsPagination {
    page: number;
    limit: number;
}