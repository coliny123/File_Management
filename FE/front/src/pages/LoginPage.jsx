import React from 'react'
import GoogleLoginBtn from '../components/btn/GoogleLoginBtn'
import NaverLoginBtn from '../components/btn/NaverLoginBtn'
import KakaoLoginBtn from '../components/btn/KakaoLoginBtn'

function LoginPage() {
  return (
    <div>
      로그인 페이지
      <GoogleLoginBtn></GoogleLoginBtn>
        <NaverLoginBtn></NaverLoginBtn>
        <KakaoLoginBtn></KakaoLoginBtn>
    </div>
  )
}

export default LoginPage
