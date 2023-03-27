import {createContext, useEffect, useState} from "react";
import {auth} from "../http/userAPI";
import {REGISTRATION_ROUTE, LOGIN_ROUTE} from "../utils/consts";

export const UserContext = createContext({});
const UserProvider = (props) => {
    const [user, setUser] = useState();
    const token = localStorage.getItem('token');
    if (token && !user)
        auth().then(data => setUser(data));
    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
        // <UserContext.Provider value={{user, setUser}}>
        //     {(!([LOGIN_ROUTE, REGISTRATION_ROUTE].includes(window.location.pathname)) && !user) ? null : props.children}
        // </UserContext.Provider>
    );
};

export default UserProvider;