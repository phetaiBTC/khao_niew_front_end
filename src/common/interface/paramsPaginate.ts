export interface Params {
    page: number;
    per_page: number;
    search?: string;
    type?: 'all' | 'paginate';
}