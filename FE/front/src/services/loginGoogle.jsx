import { useGoogleLogin } from '@react-oauth/google';

const onSuccess = async (response) => {
    const code = response.code;
    try {
        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        if (response.ok) {
            console.log('로그인 완료');
        } else {
            console.error('서버로부터 오류 응답을 받았습니다.');
        }
    } catch (error) {
        console.error('서버로 요청을 보내는 중 오류 발생:', error);
    }
};

export const loginGoogle = useGoogleLogin({
    onSuccess: (res) => onSuccess(res),
    flow: 'auth-code'
})