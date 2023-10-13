import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../context/IsLoginContext';


function Navbar() {

    const navigate = useNavigate();
    const {isLogin, setIsLogin} = useIsLogin();

    const logout = () => {
        window.localStorage.removeItem('refreshToken');
        setIsLogin(false);
    }

    console.log(isLogin)

    console.log(isLogin ? 'login' : 'logout');

    return (
        <div className='w-full h-12 bg-white'>
            <ul className='h-full flex space-x-10 justify-end mr-10 items-center'>
                <li>1</li>
                <button className='bg-[#F7F6FB] text-[#96959A] w-20 h-8 rounded-full' onClick={() => navigate("/login")}>로그인</button>
                <div className="mt-4">
                </div>
                {isLogin ? <button onClick={logout}>로그아웃</button> : <p>'로그아웃 상태'</p>}
            </ul>
        </div>
    )
}

export default Navbar
