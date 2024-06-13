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
import MySelectComponent from './pages/Sample';
import MainHomePage from "./homepagetest/MainHomePage";
import MainBoard from './homepagetest/board/MainBoard';
import TestZustand from './homepagetest/testzustand/TestZustand';

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
          {/* sample */}
          <Route path="/sample" element={<MySelectComponent/>}/>
          {/* 홈페이지 만들기 예제 */}
          <Route path="/mainhomepage" element={<MainHomePage/>}/>
          {/* 게시판 만들기 */}
          <Route path="/mainboard" element={<MainBoard/>}/>
          {/* zustand 연습 */}
          <Route path="/testzustand" element={<TestZustand/>}/>
          {/* 홈페이지 만들기 예제 끝 */}
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
};

export default App;
