import {IUser} from "../types/user.type.ts";
import {IStoreType} from "../types/store.types.ts";

export function setUser (state: IStoreType, user: IUser) {
    state.user.data = user;
}

export function setToken (state: IStoreType, token: string) {
    state.user.token = token;

    if (token) {
        sessionStorage.setItem('TOKEN', token)
    } else {
        sessionStorage.removeItem('TOKEN')
    }
}

export function toggleLoadingState (state: IStoreType) {
    state.loading = !state.loading;
}