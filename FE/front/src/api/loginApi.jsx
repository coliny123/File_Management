import axios from 'axios';

const Server_IP = process.env.REACT_APP_Server_IP;

export const loginApi = async (provider, code) => {

    await axios.post(`${Server_IP}/auth/${provider}`, { authCode: code }).then((res) => {
        // 토큰 저장하는 로직
        console.log(res.data)
        return res.data;
    }).catch((err) => {
        // 오류 처리하는 로직
        console.log('로그인 중 오류 발생', err)
    })
};

export default loginApi;

