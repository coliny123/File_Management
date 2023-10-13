import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const redirectUri = "http://localhost:3000/auth/google/callback";
const Server_IP = process.env.REACT_APP_Server_IP;
const Google_Client_ID = process.env.REACT_APP_Google_Client_ID;

// function GoogleLoginBtn({ provider }) {
function GoogleLoginBtn() {

    const [loginSuccess, setLoginSuccess] = useState(false);

    const { provider } = useParams();

    console.log(provider)

    const handleGoogleLogin = () => {
        window.location.href =
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${Google_Client_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
        };

    return (
        <div>
            <button onClick={handleGoogleLogin}>
                <img src="/assets/images/btn_google_login.png" alt="google log" />
            </button>
        </div>
    );
}

export default GoogleLoginBtn