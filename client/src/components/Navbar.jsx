import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, LOGOUT_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {UserContext} from "../AppProviders/UserProvider";

const Navbar = () => {
    const {user} = useContext(UserContext);
    return (
        <div>
            <NavLink to={POSTS_ROUTE}>
                Новости
            </NavLink>
            {
                user ?
                    <div>
                        <NavLink to={LOGOUT_ROUTE}>
                            Выйти
                        </NavLink>
                    </div>
                    :
                    <div>
                        <NavLink to={LOGIN_ROUTE}>
                            Войти
                        </NavLink>
                        <NavLink to={REGISTRATION_ROUTE}>
                            Регистрация
                        </NavLink>
                    </div>
            }
        </div>
    );
};

export default Navbar;

