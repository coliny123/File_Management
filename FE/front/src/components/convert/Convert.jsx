import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../context/IsLoginContext'

function IsNotLoginConvert() {

    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center' >
            <div className='text-xl font-bold mt-[120px]'>로그인 후 이용 가능</div>
            <div className='w-[160px] h-[56px] flex justify-center items-center text-white bg-gray-300 mt-10 hover:cursor-pointer' onClick={() => navigate('/login')}>Login</div>
        </div>
    )
}

function IsLoginConvert() {
    return (
        <div>
            <div>여기는 변환 페이지</div>
            <div>원래 형식 - 나중 형식</div>
            <div>변환 후 보내는 버튼</div>
        </div>
    )
}

function Convert() {
    const { isLogin, setIsLogin } = useIsLogin();

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full h-full border-2'>
                {isLogin ? <IsLoginConvert></IsLoginConvert> : <IsNotLoginConvert></IsNotLoginConvert>}
            </div>
            <div className='btns bg-blue-500 text-white w-[160px] h-[56px] mt-10 flex justify-center items-center'>
                <button>Next</button>
            </div>
        </div>
  )
}

export default Convert
