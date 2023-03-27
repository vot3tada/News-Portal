import React from 'react';
import {LOGIN_ROUTE} from "../utils/consts";

const Logout = () => {

    localStorage.removeItem('token');
    window.location.href = LOGIN_ROUTE;

    return (
        <div>

        </div>
    );
};

export default Logout;