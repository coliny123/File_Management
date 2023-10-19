import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loginApi } from '../api/loginApi';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useUserDataQuery } from '../hooks/query/useUserDataQuery';
import { useIsLogin } from '../context/IsLoginContext';

const Server_IP = process.env.REACT_APP_Server_IP;

function LoginRedirectPage() {
    const { provider } = useParams();

    const code = new URLSearchParams(window.location.search).get('code');
    const { isLogin, setIsLogin } = useIsLogin();

    // const queryClient = useQueryClient()
    // const { isPending, error, data } = useUserDataQuery(provider, code);

    async function fetchData() {
        try {
            const isSuccess = await loginApi(provider, code);
            // window.location.href = 'http://localhost:3000/';
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData(); // fetchData 함수를 호출
    }, []);



    return (
        <div>
            로그인 중
        </div>
    );
}

export default LoginRedirectPage;

