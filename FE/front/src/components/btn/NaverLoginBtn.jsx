import React from 'react'

function NaverLoginBtn() {

    const Naver_Client_ID = process.env.REACT_APP_Naver_Client_ID;
    const redirect_uri = 'http://localhost:3001/naver/oauth'
    const naver_uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${Naver_Client_ID}&redirect_uri=${redirect_uri}&state=false`;

    const loginNaver = () => {
        window.location.href = naver_uri;
    }

    return (
        <div>
            <button onClick={loginNaver}>네이버 로그인</button>
        </div>
    )
}

export default NaverLoginBtn
