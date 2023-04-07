import React, {createContext, useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import UserProvider from "./AppProviders/UserProvider";
import './styles/App.css';


const App = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <div className={'background'}></div>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;