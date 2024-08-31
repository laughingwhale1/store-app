import {createStore} from "vuex";
import * as actions from './actions.ts'
import * as mutations from './mutations.ts'
import {IUser} from "../types/user.type.ts";
import {IStoreType} from "../types/store.types.ts";

export const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem('TOKEN'),
            data: {} as IUser
        },
        loading: false
    } as IStoreType,
    getters: {},
    actions: actions,
    mutations: mutations
});

export default store;