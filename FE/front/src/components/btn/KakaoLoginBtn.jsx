import React from 'react'

function KakaoLoginBtn() {
  
  const Kakao_Client_ID = process.env.REACT_APP_Kakao_Client_ID;
  const redirect_uri = 'http://localhost:3001/kakao/oauth';
  const kakao_uri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Kakao_Client_ID}&redirect_uri=${redirect_uri}`;
  console.log(kakao_uri)
  const loginKakao = () => {
    window.location.href = kakao_uri;
  }
  return (
    <div>
      <button onClick={loginKakao}>카카오 로그인</button>
    </div>
  )
}

export default KakaoLoginBtn
