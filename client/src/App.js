import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginContextProvider from './contexts/LoginContextProvider';
import About from './pages/About';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import User from './pages/User';
import Admin from './pages/Admin';
import Board from './pages/Board';
import BoardWrite from './pages/BoardWrite';
import MainPractice from './practice/MainPractice';
import RandomText from './practice/RandomText';

const App = () => {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/board" element={<Board/>} />
          <Route path="/boardWrite" element={<BoardWrite/>}/>
          {/* 연습장 */}
          <Route path="/mainPractice" element={<MainPractice/>}/>
          <Route path="/randomText" element={<RandomText/>}/>
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
};

export default App;
