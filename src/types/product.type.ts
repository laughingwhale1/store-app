import { Maybe } from './base.types.ts'

export interface ProductsListResponse {
    data: Array<ProductListType>
    totalCount: number
}

export interface ProductListType {
    id: number
    title: string
    price: number
    updated_at: string
    image: string
}

export interface ProductResourceType {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
}

export interface CreateProductRequest {
    title: string;
    description: string;
    image: Maybe<File>;
    price: number;
}

export interface UpdateProductRequest {
    id: number;
    title: string;
    description: Maybe<string>;
    image: Maybe<File>;
    price: number;
}