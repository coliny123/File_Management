import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { HiFolderOpen } from 'react-icons/hi'
import { AiFillCloud } from 'react-icons/ai'
import { HiMiniHome } from 'react-icons/hi2'
import { FaCloudDownloadAlt } from 'react-icons/fa';

function Bottombar() {
    const navigate = useNavigate();

    const location = useLocation();

    return (
        <>
            <div className='fixed bottom-0 w-full flex justify-center bg-white z-20 h-[80px] border-t-2'>
                <div className='menu flex justify-center items-center text-[#999999] space-x-20'>
                    <button onClick={() => navigate('/')}><div className={`w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox ${location.pathname === '/' ? 'text-[#6367EB]' : 'text-[#999999]'}`}><HiMiniHome /></div></button>
                    <button onClick={() => navigate('/file')}><div className='w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox'><HiFolderOpen/></div></button>
                    <button onClick={() => navigate('/code')}><div className='w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox'><FaCloudDownloadAlt/></div></button>
                </div>
            </div>
        </>
    )
}

export default Bottombar;
