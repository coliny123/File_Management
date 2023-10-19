import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../context/IsLoginContext';
import { BsFillCloudArrowUpFill } from 'react-icons/bs'

const LoginBtn = () => {

    const navigate = useNavigate();
    return (
        <button className='bg-[#F7F6FB] w-[120px] h-[40px] rounded-[16px]' onClick={() => navigate("/login")}>로그인</button>
    )
}

const LogoutBtn = () => {

    const { isLogin, setIsLogin } = useIsLogin();

    const logout = () => {
        window.localStorage.removeItem('refreshToken');
        setIsLogin(false);
    }

    return (
        <button className='bg-[#F7F6FB] w-[120px] h-[40px] rounded-[16px]' onClick={logout}>로그아웃</button>
    )
}


function Navbar() {

    const navigate = useNavigate();

    const {isLogin, setIsLogin} = useIsLogin();
    return (
        <div className='relative z-30 w-full h-20 bg-white flex items-center'>
            <input className='absolute left-[80px] bg-[#F7F6FB] text-center w-[200px] h-[40px] rounded-[16px]' placeholder='코드 입력'></input>
            <div onClick={() => navigate('/')} className='hover:cursor-pointer absolute left-1/2 -translate-x-1/2 text-center bg-[#F7F6FB] w-[160px] h-[40px] flex items-center justify-center'><BsFillCloudArrowUpFill className='text-black' /><p>ICloduU</p></div>
            <div className='absolute right-10'>{isLogin ? <LogoutBtn /> : <LoginBtn />}</div>
        </div>
    )
}

export default Navbar
