import axios from "axios";

export const intercept = () => {
    const axiosClient = axios.create();
    axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`

    axiosClient.interceptors.request.use(config => {
        // config.headers.Authorization = `Bearer ${setBearerToken()}`
        return config;
    })

    axiosClient.interceptors.response.use(
        response => {
            return response;
        }, error => {
            console.log(error)
            if (error.response.status === 401) {
                sessionStorage.removeItem('TOKEN');
                window.location.href = '/login'
            }
            throw error;
        })
}