import React, { useState } from 'react'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { useNavigate,useLocation } from 'react-router-dom';
import { HiFolderOpen } from 'react-icons/hi'
import { AiFillCloud } from 'react-icons/ai'
import { HiMiniHome } from 'react-icons/hi2'
import { FaCloudDownloadAlt } from 'react-icons/fa';

function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();

    return (
        <>
            <div className='fixed left-0 top-0 h-full md:w-[80px] w-[80px] flex flex-col bg-white z-20'>
                <div className='menu mt-[120px] flex flex-col justify-center items-center text-[#999999] space-y-6'>
                    <button onClick={() => navigate('/')}><div className={`w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox ${location.pathname === '/' ? 'text-[#6367EB]' : 'text-[#999999]'}`}><HiMiniHome /></div></button>
                    <button onClick={() => navigate('/file')}><div className='w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox'><HiFolderOpen/></div></button>
                    <button onClick={() => navigate('/code')}><div className='w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox'><FaCloudDownloadAlt/></div></button>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
