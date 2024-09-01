import {IUser} from "../types/user.type.ts";
import {IStoreType} from "../types/store.types.ts";
import {ProductsListResponse} from "../types/product.type.ts";

export function setUser(state: IStoreType, user: IUser) {
    state.user.data = user;
}

export function setToken(state: IStoreType, token: string) {
    state.user.token = token;

    if (token) {
        sessionStorage.setItem('TOKEN', token)
    } else {
        sessionStorage.removeItem('TOKEN')
    }
}

export function setProducts(state: IStoreType, productsList: ProductsListResponse) {
    state.products.data = productsList.data
    state.products.totalCount = productsList.totalCount
}

export function setLoading(state: IStoreType, isLoading: boolean) {
    state.loading = isLoading;
}