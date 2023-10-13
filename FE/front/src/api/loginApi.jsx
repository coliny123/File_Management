import axios from 'axios';

const Server_IP = process.env.REACT_APP_Server_IP;

export const loginApi = async (provider, code) => {
    console.log('로그인 중')
    await axios.post(`${Server_IP}/auth/${provider}`, { authCode: code })
    .then((res) => {
        window.localStorage.setItem('refreshToken', res.data.token);
    })
    .catch((err) => {
        console.log(err)
    })
}

export default loginApi;


