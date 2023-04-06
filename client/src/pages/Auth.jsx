import React, {useContext, useEffect, useState} from 'react';
import {Link, redirect, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login as Login, registration as Registration} from "../http/userAPI";
import {UserContext} from "../AppProviders/UserProvider";
import {Card, Button, Form} from "react-bootstrap";
import '../styles/AuthCard.css'


const Auth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) return navigate(POSTS_ROUTE);
    }, [])
    const isLogin = useLocation().pathname === LOGIN_ROUTE;
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [res, setRes] = useState('');
    const {user, setUser} = useContext(UserContext);


    const singIn = async () => {
        setRes('');
        let data;
        if (isLogin) {
            data = await Login(login, password).catch(err => {
                console.log(err.response.data.message)
                setRes(err.response.data.message)
            });
        } else {
            data = await Registration(name, login, password).catch(err => {
                setRes(err.response.data.message)
            });
        }
        if (data) {
            setUser(data);
            return navigate(POSTS_ROUTE);
        }
    }

    return (
        <div className={'centerCard'}>
            <Card style={{width: '20rem'}}>
                <Card.Body className={'authBody'}>
                        <Card.Title className={'Center'}>{isLogin ? 'Вход' : 'Регистрация'}</Card.Title>
                        {!isLogin &&
                            <Form.Control
                                type={'input'}
                                placeholder={'Имя'}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        }
                        <Form.Control
                            type={'input'}
                            placeholder={'Логин'}
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                        />
                        <Form.Control
                            type={'password'}
                            placeholder={'Пароль'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        {isLogin ?
                            <div className={'Center'}>
                                Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                            </div>
                            :
                            <div className={'Center'}>
                                Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
                            </div>
                        }
                        <Card.Subtitle style={{height: '20px'}} className={'Center mb-2 text-muted'}>{res}</Card.Subtitle>
                        <Button onClick={singIn}>{isLogin ? 'Вход' : 'Регистрация'}</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Auth;
