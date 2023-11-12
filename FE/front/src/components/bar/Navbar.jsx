import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIsLogin } from '../../context/IsLoginContext';
import { BsCloudArrowDown } from 'react-icons/bs'
import { HiMiniHome } from 'react-icons/hi2'
import { AiFillCloud } from 'react-icons/ai'

const DownBtn = () => {

    const navigate = useNavigate();
    return (
        <button className='text-white bg-[#6367EB] w-full h-[48px] rounded-[18px]' onClick={() => navigate("/download/1")}>다운로드</button>
    )
}

const LoginBtn = () => {

    const navigate = useNavigate();
    return (
        <button className='text-white bg-[#6367EB] w-full h-[48px] rounded-[18px]' onClick={() => navigate("/login")}>로그인</button>
    )
}

const LogoutBtn = () => {

    const { isLogin, setIsLogin } = useIsLogin();

    const logout = () => {
        window.localStorage.removeItem('refreshToken');
        setIsLogin(false);
        window.location.reload();
    }

    return (
        <button className='text-white bg-[#6367EB] w-full h-[48px] rounded-[18px]' onClick={logout}>로그아웃</button>
    )
}


function Navbar() {

    const navigate = useNavigate();

    const {isLogin, setIsLogin} = useIsLogin();
    return (
         <div className='fixed z-[1000] w-full h-[80px] bg-white flex items-center'>
            <div className='absolute left-[156px] bg-[#F7F6FB] w-[200px] h-[48px] rounded-[18px] flex items-center font-bold pl-5 max-md:invisible'> <div className=''>코드입력:</div>  <input className='w-[100px] h-full rounded-[18px] pointer-events-auto bg-[#F7F6FB] outline-none' type="text"/></div>
            <div className='absolute left-[360px] bg-[#F7F6FB] w-[200px] h-[48px] rounded-[18px] flex items-center pl-5'><DownBtn/> </div>
            <div className='absolute right-[40px] w-[120px] h-[48px]'>{isLogin ? <LogoutBtn /> : <LoginBtn />}</div>
        </div>
    )
}

export default Navbar
