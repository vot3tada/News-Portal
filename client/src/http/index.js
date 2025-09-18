import axios from "axios";
import {LOGIN_ROUTE} from "../utils/consts";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return config
}



$host.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = LOGIN_ROUTE;
        }
    });

$host.interceptors.request.use(authInterceptor)



export {
    $host,
    $authHost
}