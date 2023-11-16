import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function GoogleLoginBtn() {
    const Server_IP = process.env.REACT_APP_Server_IP;
    const Google_Client_ID = process.env.REACT_APP_Google_Client_ID;
    const redirectUri = `https://file-management-ten.vercel.app/auth/google/callback`;
    // const redirectUri = `http://localhost:3000/auth/google/callback`;
        
    const [loginSuccess, setLoginSuccess] = useState(false);

    const { provider } = useParams();

    const handleGoogleLogin = () => {
        window.location.href =
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Google_Client_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
        };

    return (
        <div>
            <button onClick={handleGoogleLogin} className='inline-block overflow-hidden relative p-0 border-none cursor-pointer w-[226px]'>
                <img src="/assets/images/btn_google_login.png" alt="google log" className='w-full h-full object-cover object-center' />
            </button>
        </div>
    );
}

export default GoogleLoginBtn