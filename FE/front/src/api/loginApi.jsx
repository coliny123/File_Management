import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


export const loginApi = async ({ code, provider }) => {
    const Server_IP = '';
    // const { provider } = useParams();

    axios.post(`${Server_IP}/auth/${provider}`, { authCode: code })
        .then(res => {
            // 저장하는 로직이나 아니면 따로 빼도 됨
            localStorage.setItem('token', res.data.token);
            window.location.href = 'http://localhost:3000'

            return res.data
    })
}