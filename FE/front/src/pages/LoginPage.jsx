import React from 'react'
import GoogleLoginBtn from '../components/btn/GoogleLoginBtn'
import NaverLoginBtn from '../components/btn/NaverLoginBtn'
import KakaoLoginBtn from '../components/btn/KakaoLoginBtn'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const navigate = useNavigate();

  return (
    <div className='-screen h-screen flex items-center justify-center'>
      <div className='w-[300px] h-[600px] flex flex-col items-center mt-[70px]'>
        <img src="/assets/images/cloud_img.png" alt="google log" className='w-[80px] h-[80px] object-cover object-center' />
        <div className='w-[170px] h-[48px] text-2xl mb-3 text-center border-b-2 font-bold border-black mt-[27px]'>소셜 로그인</div>
        <div className='btn-wrapper mt-[60px] space-y-1'>
          <GoogleLoginBtn></GoogleLoginBtn>
          <NaverLoginBtn></NaverLoginBtn>
          <KakaoLoginBtn></KakaoLoginBtn>
        </div>
        <button className='text-white bg-[#6367EB] w-[150px] h-[48px] rounded-[4px] mt-10' onClick={() => navigate('/')}>홈 화면</button>
      </div>
    </div>
  )
}

export default LoginPage
