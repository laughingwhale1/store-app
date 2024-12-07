import API from "../api/base.api.ts";
import { ApiResponse, ApiResponseEmpty } from '../types/api.types.ts'
import {IUser, UserLoginRequest, UserLoginResponse} from "../types/user.type.ts";
import {Commit} from "vuex";
import { CreateProductRequest, ProductListType, UpdateProductRequest } from '../types/product.type.ts'
import {SortDirection} from "../constants/sort.ts";

interface CommitObj {
    commit: Commit
}

export async function login ({commit}: CommitObj, data: UserLoginRequest) {
    const res: ApiResponse<UserLoginResponse> = await API.post('/auth/login', data)
    if (res.success) {
        commit('setUser', res.value.user)
        commit('setToken', res.value.token)
    }

    return res
}

export function logout ({commit}: CommitObj) {
    return API.post('/auth/logout', {})
        .then((response) => {
            commit('setToken', null)
            return response
        })
}

export async function getUser({commit}: CommitObj) {
    const res: ApiResponse<IUser> = await API.get('/user', {})
    commit('setUser', res.value)
    return res;
}

export async function getProducts (
    {commit}: CommitObj,
    {page, perPage, search, orderBy}: {page: number, perPage: number, search: string, orderBy: SortDirection}
) {
    const res: ApiResponse<ProductListType> = await API.get('/product', {
        page: page,
        per_page: perPage,
        search: search ? search : undefined,
        order_by: orderBy
    })
    commit('setProducts', res.value)
    return res;
}

export async function createProduct({commit}: CommitObj, product: CreateProductRequest) {
    if (product.image instanceof File) {
        const form = new FormData();
        form.append('title', product.title);
        form.append('image', product.image);
        form.append('description', product.description);
        form.append('price', String( product.price));

        const res: ApiResponseEmpty = await API.post('product', form)
        return res;
    }

    const res: ApiResponseEmpty = await API.post('product', product)
    return res;
}

export async function updateProduct({commit}: CommitObj, product: UpdateProductRequest) {
    const id = product.id
    if (product.image instanceof File) {
        const form = new FormData();
        form.append('id', String(product.id));
        form.append('title', product.title);
        form.append('image', product.image);
        form.append('description', product.description || '');
        form.append('price', String(product.price));
        form.append('_method', 'PUT');
        for (let [key, value] of form.entries()) {
            console.log(key, value);
        }
        const res: ApiResponseEmpty = await API.post(`/product/${id}`, form)
        return res;
    }
    const res: ApiResponseEmpty = await API.put(`/product/${id}`, product)
    return res;
}

export async function deleteProduct({commit}: CommitObj, productId: number) {
    const res: ApiResponseEmpty = await API.delete(`/product/${productId}`)
    return res;
}

export function toggleLoadingState({commit}: CommitObj, isLoading: boolean) {
    commit('setLoading', isLoading);
}