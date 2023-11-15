import React from 'react'

export default function NaverLoginBtn() {

    const Server_IP = process.env.REACT_APP_Server_IP;
    const Naver_Client_ID = process.env.REACT_APP_Naver_Client_ID;
    const redirect_uri = `https://file-management-ten.vercel.app/auth/naver/callback`;
    const naver_uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${Naver_Client_ID}&redirect_uri=${redirect_uri}&state=false`;

    const loginNaver = () => {
        window.location.href = naver_uri;
    }

    return (
        <div>
            <button className="inline-block overflow-hidden relative p-0 border-none cursor-pointer w-[220px]" onClick={loginNaver}>
                <img src="/assets/images/btn_naver_login.png" alt="google log" className='w-full h-full object-cover object-center' />
            </button>
        </div>
    )
}