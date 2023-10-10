import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loginApi } from '../api/loginApi';

const Server_IP = process.env.REACT_APP_Server_IP;

function LoginRedirectPage() {

    const [loginSuccess, setLoginSuccess] = useState(false);
    const { provider } = useParams();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const userData = loginApi(provider, code);
        

        // if (code) {
        //     axios.post(`${Server_IP}/auth/${provider}`, { authCode: code })
        //         .then(res => {
        //             const { token, email, name } = res.data;

        //             localStorage.setItem('token', token);
        //             localStorage.setItem('email', email);
        //             localStorage.setItem('name', name);

        //             setLoginSuccess(true);
        //             window.location.href = 'http://localhost:3000'
        //         })
        //         .catch(err => {
        //             console.error("authCode err : ", err);
        //             if (err.response) {
        //                 console.error('Error response data:', err.response.data);
        //             }
        //         });
        // }
    }, []);

    return (
    <div>
      
    </div>
  )
}

export default LoginRedirectPage
