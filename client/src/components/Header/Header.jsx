import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { LoginContext } from '../../contexts/LoginContextProvider';

const Header = () => {

    // ✅ isLogin   : 로그인 여부 - Y(true), N(false)
    // ✅ logout()  : 로그아웃 함수 - setIsLogin(false)
  const styles = {
    color:'black',
    fontSize:'20px',
    textDecoration:'none',
    fontWeight:'600'
  }

    const { isLogin, logout, userInfo } = useContext(LoginContext);
    return (
      <header>
          <div className="logo">
              <Link to="/">
                <img src="https://i.imgur.com/fzADqJo.png" alt="logo" className='logo' />
              </Link>
          </div>
          <div className="util">
              <ul>
                {/* 로그인 여부에 따라 조건부 랜더링 */}
                { !isLogin ? 
                  <>
                    <li><Link to="/login" style={styles}>로그인</Link></li>
                    <li><Link to="/join" style={styles}>회원가입</Link></li>
                    <li><Link to="/about" style={styles}>소개</Link></li>
                    <li><Link to="/admin" style={styles}>관리자</Link></li>
                    <li><Link to="/board" style={styles}>게시판</Link></li>
                    <li><Link to="/mainPractice" style={styles}>연습장</Link></li>
                    <li><Link to="/sample" style={styles}>예제</Link></li>
                  </>
                :
                  <>
                    <li><Link to="/user" style={styles}>마이페이지({userInfo.userId})</Link></li>
                    <li><Link to="/admin" style={styles}>관리자</Link></li>
                    <li><Link to="/board" style={styles}>게시판</Link></li>
                    <li><Link to="/mainPractice" style={styles}>연습장</Link></li>
                    <li><Link to="/sample" style={styles}>예제</Link></li>
                    <li><button className='link' onClick={ () => logout() }>로그아웃</button></li>
                  </>
                }
              </ul>
          </div>
      </header>
  )
}

export default Header