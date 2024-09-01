export interface ProductsListResponse {
    data: Array<ProductArrayType>
    totalCount: number
}

export interface ProductArrayType {
    id: number,
    title: string,
    price: number,
    updated_at: string,
    image: string
}