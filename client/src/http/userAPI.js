import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"
import {LOGIN_ROUTE, POSTS_ROUTE} from "../utils/consts";


export const registration = async (name, login, password) => {
    const {data} = await $authHost.post('user/registration', {name, login, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (login, password) => {
    const {data} = await $authHost.post('user/login', {login, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const auth = async () => {
    const {data} = await $host.get('user/auth');
    if (!data) return;
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}
export const changeRole = async (login, role) => {
    const {data} = await $host.put('user/', {login, role})
    return data
}