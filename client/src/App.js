import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
//require('dotenv').config()

const Main = () => <h1>Hello world</h1>;

function App() {
  return (

      <BrowserRouter>
          <Main/>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default App;