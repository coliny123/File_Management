import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLoginBtn() {

    const onSuccess = (response) => {
        const code = response.code;
        console.log(code)
        axios.post('http://172.30.1.58:8080/auth', { authCode: code }, {
        // axios.post('', { authCode: code }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    console.log('로그인 완료');
                    console.log(res?.data);
                } else {
                    console.error('서버로부터 오류 응답을 받았습니다.');
                }
            })
            .catch((error) => {
                console.error('서버로 요청을 보내는 중 오류 발생:', error);
            });
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: (res) => onSuccess(res),
        flow: 'auth-code'
    });

    return (
        <div>
            <button onClick={() => loginGoogle()}>
                <img src="/assets/images/btn_google_login.png" alt="google log" />
            </button>
        </div>
    );
}

export default GoogleLoginBtn