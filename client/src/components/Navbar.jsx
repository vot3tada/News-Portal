import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {LOGOUT_ROUTE, POSTS_ROUTE} from "../utils/consts";
import {UserContext} from "../AppProviders/UserProvider";


const Navbar = () => {
    const {user} = useContext(UserContext);
    return (
        <div>
            <NavLink to={POSTS_ROUTE}>
                Новости
            </NavLink>
            {
                user &&
                <NavLink to={LOGOUT_ROUTE}>
                    Выйти
                </NavLink>
            }
        </div>
    );
};

export default Navbar;

