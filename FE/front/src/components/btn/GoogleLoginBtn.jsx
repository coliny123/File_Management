import React from 'react';
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const redirectUri = "http://localhost:3001/auth/google/callback";
const Server_IP = process.env.REACT_APP_Server_IP;
const Google_Client_ID = process.env.REACT_APP_Google_Client_ID;

function GoogleLoginBtn() {

    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href =
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Google_Client_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // auth code가 있으면 백엔드 서버로 전송
            axios.post(`${Server_IP}/auth`, { authCode: code })
                .then(res => {
                    const { token, email, name } = res.data;

                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', name);

                    setLoginSuccess(true);
                    window.location.href = 'http://localhost:3001'
                })
                .catch(err => {
                    console.error("authCode err : ", err);
                    if (err.response) {
                        console.error('Error response data:', err.response.data);
                    }
                });
        }
    }, []);

    return (
        <div>
            <button onClick={handleGoogleLogin}>
                <img src="/assets/images/btn_google_login.png" alt="google log" />
            </button>
        </div>
    );
}

export default GoogleLoginBtn