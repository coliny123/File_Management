import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIsLogin } from '../../context/IsLoginContext';
import { BsCloudArrowDown } from 'react-icons/bs'
import { HiMiniHome } from 'react-icons/hi2'

const LoginBtn = () => {

    const navigate = useNavigate();
    return (
        <button className='text-white bg-[#6367EB] w-[160px] h-[48px] rounded-[18px]' onClick={() => navigate("/login")}>로그인</button>
    )
}

const LogoutBtn = () => {

    const { isLogin, setIsLogin } = useIsLogin();

    const logout = () => {
        window.localStorage.removeItem('refreshToken');
        setIsLogin(false);
    }

    return (
        <button className='text-white bg-[#6367EB] w-[160px] h-[48px] rounded-[18px]' onClick={logout}>로그아웃</button>
    )
}


function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const {isLogin, setIsLogin} = useIsLogin();
    return (
        <div className='relative z-30 w-full h-[80px] bg-white flex items-center'>
            <button onClick={() => navigate('/')}>
                <div className={`ml-[16px] w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox ${location.pathname.includes('file') ? 'text-[#999999]' : 'text-[#6367EB]'}`}>
                    <HiMiniHome />
                </div>
            </button>
            <div className='absolute left-[156px] bg-[#F7F6FB] w-[200px] h-[48px] rounded-[18px] flex items-center font-bold text-md pl-5'> <div>코드입력:</div>  <input className='w-[120px] h-full rounded-[18px] pointer-events-auto' type="text"/></div>
            <div className='absolute right-10'>{isLogin ? <LogoutBtn /> : <LoginBtn />}</div>
        </div>

    )
}

export default Navbar
