import React, {useContext} from 'react';
import {Routes, Route, Redirect} from 'react-router-dom'
//import {Context} from "../";
import {observer} from "mobx-react-lite";
import {authRoutes, publicRoutes} from "../routes";

const AppRouter = observer(() => {
    return (
        <Routes>
            {authRoutes.map(({path, Component}) =>
                <Route path = {path} element = {Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route path = {path} element = {Component} exact/>
            )}
        </Routes>
    );
});

export default AppRouter;