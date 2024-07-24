import {store} from "../store/store.ts";
import axios from "axios";

export const setBearerToken = () => {
    const token = store.getState().userReducer.token;
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    return token;
};
