import React from 'react'

export default function KakaoLoginBtn() {
  
  const Server_IP = process.env.REACT_APP_Server_IP;
  const Kakao_Client_ID = process.env.REACT_APP_Kakao_Client_ID;
  const redirect_uri = `https://file-management-ten.vercel.app/auth/kakao/callback`;
  // const redirect_uri = `http://localhost:3000/auth/kakao/callback`;
  const kakao_uri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Kakao_Client_ID}&redirect_uri=${redirect_uri}`;

  const loginKakao = () => {
    window.location.href = kakao_uri;
  }
  return (
    <div>
      <button className="inline-block overflow-hidden relative p-0 border-none cursor-pointer w-[220px]" onClick={loginKakao}>
        <img src="/assets/images/btn_kakao_login.png" alt="google log" className='w-full h-full object-cover object-center' />
      </button>
    </div>
  )
}
