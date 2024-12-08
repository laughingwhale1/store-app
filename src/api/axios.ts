import axios from "axios";
import store from '../store'

export const intercept = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    axios.defaults.baseURL = `${baseUrl}/api`

    axios.interceptors.request.use(config => {
        // config.headers.Authorization = `Bearer ${setBearerToken()}`
        return config;
    })

    axios.interceptors.response.use(
        response => {
            return response;
        }, error => {
            console.log(error)
            if (error.response.status === 401) {
                store.commit('setToken', null)
                sessionStorage.removeItem('TOKEN');
                window.location.href = '/login'
            }
            throw error;
        })

}