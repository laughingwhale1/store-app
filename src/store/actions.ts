import BaseApi from "../api/base.api.ts";
import {ApiResponse} from "../types/api.types.ts";
import {UserLoginRequest, UserLoginResponse} from "../types/user.type.ts";
import {Commit} from "vuex";

interface CommitObj {
    commit: Commit
}

export function login ({commit}: CommitObj, data: UserLoginRequest) {
    return BaseApi.post('/auth/login', data)
        .then((data: ApiResponse<UserLoginResponse>) => {
            commit('setUser', data.value.user)
            commit('setToken', data.value.token)
            return data;
        }) 
}

export function logout ({commit}: CommitObj) {
    return BaseApi.post('/auth/logout', {})
        .then((response) => {
            commit('setToken', null)
            return response
        })
}

export function toggleLoadingAction({commit}: CommitObj) {
    commit('toggleLoadingState');
}