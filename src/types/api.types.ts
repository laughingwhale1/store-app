export type PayloadError = {
    key: string;
    message: string;
};

export type PayloadMessage = {
    title: string;
    message: string;
};

export interface ApiResponse<T> {
    value: T;
    success: boolean;
    errors: PayloadError[];
    messages: PayloadMessage[];
}

export interface ApiResponseEmpty {
    success: boolean;
    errors: PayloadError[];
    messages: PayloadMessage[];
}

export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

interface MetaLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<MetaLink>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}
