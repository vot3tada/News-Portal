import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";


const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;