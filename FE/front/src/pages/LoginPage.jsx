import React from 'react'
import GoogleLoginBtn from '../components/btn/GoogleLoginBtn'
import NaverLoginBtn from '../components/btn/NaverLoginBtn'
import KakaoLoginBtn from '../components/btn/KakaoLoginBtn'

function LoginPage() {

  return (
    <div className='-screen h-screen flex items-center justify-center'>
      <div className='w-[300px] h-[300px] border-[#F7F6FB]-1000 border-4 rounded-xl flex flex-col justify-center items-center'>
        <div className='w-[250px] h-[48px] rounded-[18px] text-2xl flex items-center mb-3 ml-8'>소셜 로그인</div>
        <GoogleLoginBtn></GoogleLoginBtn>
        <NaverLoginBtn></NaverLoginBtn>
        <KakaoLoginBtn></KakaoLoginBtn>
      </div>
    </div>
  )
}

export default LoginPage
