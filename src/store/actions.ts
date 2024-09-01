import API from "../api/base.api.ts";
import {ApiResponse} from "../types/api.types.ts";
import {IUser, UserLoginRequest, UserLoginResponse} from "../types/user.type.ts";
import {Commit} from "vuex";
import {ProductArrayType} from "../types/product.type.ts";
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
    const res: ApiResponse<ProductArrayType> = await API.get('/product', {
        page: page,
        per_page: perPage,
        search: search ? search : undefined,
        order_by: orderBy
    })
    commit('setProducts', res.value)
    return res;
}

export function toggleLoadingState({commit}: CommitObj, isLoading: boolean) {
    commit('setLoading', isLoading);
}