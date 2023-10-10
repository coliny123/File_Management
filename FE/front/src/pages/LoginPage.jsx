import React from 'react'
import GoogleLoginBtn from '../components/btn/GoogleLoginBtn'
import NaverLoginBtn from '../components/btn/NaverLoginBtn'
import KakaoLoginBtn from '../components/btn/KakaoLoginBtn'
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';


function LoginPage() {

  const { provider } = useParams();
  return (
    <div>
      로그인 페이지
      <GoogleLoginBtn provider={provider}></GoogleLoginBtn>
      <NaverLoginBtn provider={provider}></NaverLoginBtn>
      <KakaoLoginBtn provider={provider}></KakaoLoginBtn>
    </div>
  )
}

export default LoginPage
