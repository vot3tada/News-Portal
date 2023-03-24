import React, {useContext, useState} from 'react';
import {Form, Link, redirect, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login as Login, registration as Registration} from "../http/userAPI";




const Auth = () => {

    if (localStorage.getItem('token')) window.location.href = POSTS_ROUTE;
    const isLogin = useLocation().pathname === LOGIN_ROUTE;
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [res, setRes] = useState('');
    const navigate = useNavigate();



    const singIn = async () => {
        setRes('');
        let data;
        if (isLogin) {
            data = await Login(login, password).catch(err => {
                setRes(err.response.data.message)
            });
        } else {
            data = await Registration(name, login, password).catch(err => {
                setRes(err.response.data.message)
            });
        }
        if (data) return navigate(POSTS_ROUTE);
    }

    return (
        <div>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            {!isLogin ?
                <input
                    type={'input'}
                    placeholder={'Имя'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                /> : ''
            }
            <input
                type={'input'}
                placeholder={'Логин'}
                value={login}
                onChange={e => setLogin(e.target.value)}
            />
            <input
                type={'password'}
                placeholder={'Пароль'}
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            {isLogin ?
                <div>
                    Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                </div>
                :
                <div>
                    Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
                </div>
            }
            <button onClick={singIn}>{isLogin ? 'Вход' : 'Регистрация'}</button>
            <div>{res}</div>
        </div>
    );
}

export default Auth;
