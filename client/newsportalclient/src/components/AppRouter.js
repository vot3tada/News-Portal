import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    return (
        <Switch>
        </Switch>
    );
});

export default AppRouter;