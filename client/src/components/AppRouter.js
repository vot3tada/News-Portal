import React from 'react';
import {useRoutes} from 'react-router-dom'
//import {Context} from "../";
import {authRoutes, publicRoutes} from "../routes";

const AppRouter = () => {
    return useRoutes(
        [...authRoutes.map(({path, Component}) =>
            ({path: path, element: <Component/>})),
            ...publicRoutes.map(({path, Component}) =>
                ({path: path, element: <Component/>}))]
    );
};

export default AppRouter;