import axios from "axios";
import store from "../store";

export const setBearerToken = () => {
    const token = store.state.user.token;
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    return token;
};