import API from "../api/base.api.ts";
import {ApiResponse} from "../types/api.types.ts";
import {IUser, UserLoginRequest, UserLoginResponse} from "../types/user.type.ts";
import {Commit} from "vuex";

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
    // return API.post('/auth/login', data)
    //     .then((data: ApiResponse<UserLoginResponse>) => {
    //         commit('setUser', data.value.user)
    //         commit('setToken', data.value.token)
    //         return data;
    //     })
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

export function toggleLoadingState({commit}: CommitObj, isLoading: boolean) {
    commit('setLoading', isLoading);
}