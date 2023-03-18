import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
