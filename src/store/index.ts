import {createStore} from "vuex";

export const store = createStore({
    state: {
        user: {
            token: true,
            data: {}
        }
    },
    getters: {},
    actions: {},
    mutations: {}
});

export default store;