import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Posts from "./pages/Posts";

const Main = () => <h1>Hello world</h1>;

function App() {
  return (
      <Router>
          <Routes>
              <Route path='/' component={Main} />
          </Routes>
      </Router>
  );
}

export default App;