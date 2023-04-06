import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    POSTS_ROUTE,
    REGISTRATION_ROUTE,
    CREATE_POST_ROUTE,
    SMART_POSTS_ROUTE,
    MY_POSTS_ROUTE
} from "../utils/consts";
import {UserContext} from "../AppProviders/UserProvider";
import '../styles/Navbar.css'

const Navbar = () => {
    const {user} = useContext(UserContext);
    return (
        <div>
            <div className={'Navbar'}>
                <div className={'navbarMargin'}>
                    <NavLink className={'buttonLink'} to={POSTS_ROUTE}>Новости</NavLink>
                    {user &&
                        <NavLink to={SMART_POSTS_ROUTE} className={'buttonLink'}>
                            Для вас
                        </NavLink>
                    }
                    {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
                        <NavLink className={'buttonLink'} to={CREATE_POST_ROUTE}>
                            Добавить новость
                        </NavLink>
                    }
                    {(user?.role === 'ADMIN' || user?.role === 'CREATOR') &&
                        <NavLink className={'buttonLink'} to={MY_POSTS_ROUTE}>
                            Мои
                        </NavLink>
                    }
                    {user?.role === 'ADMIN' &&
                        <NavLink className={'buttonLink'} to={CREATE_POST_ROUTE}>
                            Админка
                        </NavLink>
                    }
                </div>
                    {
                        user ?
                            <div className={'navbarMargin'}>
                                <NavLink className={'buttonLink'} to={LOGOUT_ROUTE}>
                                    Выйти
                                </NavLink>
                            </div>
                            :
                            <div className={'navbarMargin'}>
                                <NavLink className={'buttonLink'} to={LOGIN_ROUTE}>
                                    Войти
                                </NavLink>
                                <NavLink className={'buttonLink'} to={REGISTRATION_ROUTE}>
                                    Регистрация
                                </NavLink>
                            </div>
                    }
            </div>
        </div>
    );
};

export default Navbar;

