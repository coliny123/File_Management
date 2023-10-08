import React from 'react'

export default function KakaoLoginBtn() {
  
  const Kakao_Client_ID = process.env.REACT_APP_Kakao_Client_ID;
  const redirect_uri = 'http://localhost:3000/kakao/oauth';
  const kakao_uri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Kakao_Client_ID}&redirect_uri=${redirect_uri}`;

  const loginKakao = () => {
    window.location.href = kakao_uri;
  }
  return (
    <div>
      <button className="bg-blue-500 text-white px-10 py-5 text-2xl rounded-2xl" onClick={loginKakao}>
        카카오 로그인</button>
    </div>
  )
}
