import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const redirectUri = "http://localhost:3000/auth/google/callback";
const Server_IP = process.env.REACT_APP_Server_IP;
const Google_Client_ID = process.env.REACT_APP_Google_Client_ID;

function NaverLoginRedirectPage() {

    const [loginSuccess, setLoginSuccess] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // auth code가 있으면 백엔드 서버로 전송
            axios.post(`${Server_IP}/auth/naver`, { authCode: code })
                .then(res => {
                    const { token, email, name } = res.data;

                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', name);

                    setLoginSuccess(true);
                    window.location.href = 'http://localhost:3000'
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

        </div>
    )
}

export default NaverLoginRedirectPage
