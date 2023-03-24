import React from 'react';
import {NavLink} from "react-router-dom";
import {LOGOUT_ROUTE, POSTS_ROUTE} from "../utils/consts";


const Navbar = () => {
    return (
        <div>
            <NavLink to={POSTS_ROUTE}>
                Новости
            </NavLink>
            {
                localStorage.getItem('token')?
                <NavLink to={LOGOUT_ROUTE}>
                    Выйти
                </NavLink>
                :
                ''
            }
        </div>
    );
};

export default Navbar;

