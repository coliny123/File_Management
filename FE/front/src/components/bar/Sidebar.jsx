import React, { useState } from 'react'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { useNavigate,useLocation } from 'react-router-dom';
import { HiFolderOpen } from 'react-icons/hi'
import { AiFillCloud } from 'react-icons/ai'
import { HiMiniHome } from 'react-icons/hi2'

function Sidebar() {

    const navigate = useNavigate();

    // const [isTogglebarOpen, setIsTogglebarOpen] = useState(false);

    // const handleOpenTogglebar = () => {
    //     setIsTogglebarOpen((pre) => !pre);
    //     console.log(isTogglebarOpen)
    // };
    const location = useLocation();

    return (
        <>
            {/* <div className='fixed left-0 top-0 h-full w-[64px] flex flex-col bg-white z-20'> */}
            <div className='fixed left-0 top-0 h-full md:w-[80px] w-[80px] flex flex-col bg-white z-20'>
                <div className='title'>title</div>
                <div className='menu mt-[120px] flex flex-col justify-center items-center text-[#999999] space-y-6'>
                    <button onClick={() => navigate('/')}><div className={`w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox ${location.pathname.includes('file') ? 'text-[#999999]' : 'text-[#6367EB]'}`}><HiMiniHome /></div></button>
                    <button onClick={() => navigate('/')}><div className='w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox'><HiFolderOpen/></div></button>
                    <button onClick={() => navigate('/file')}><div className='w-[48px] h-[48px] bg-[#F7F6FB] rounded-[14px] flex justify-center items-center text-2xl shadow-customIconBox'><AiFillCloud/></div></button>
                </div>
            </div>
            {/* <div className={`z-10 fixed left-[64px] top-0 flex-col w-24 bg-green-500 h-full transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '' : '-translate-x-full'}`}> */}
            {/* <div className={`z-10 fixed md:left-[64px] left-[12vw] top-0 flex-col w-24 bg-green-500 h-full transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '' : '-translate-x-full'}`}>
                <div>토글</div>
                <div>토글</div>
                <div>토글</div>
            </div> */}
        </>
    )
}

export default Sidebar;
