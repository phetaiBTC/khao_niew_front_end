export interface Params {
    page?: number;
    per_page?: number;
    search?: string;
    type?: 'all' | 'paginate';
    order_by?: 'ASC' | 'DESC'
}

export interface PaginateEntity<T> {
    data: T[],
    pagination: {
        page: number;
        per_page: number;
        total: number;
        total_pages: number
    }
}