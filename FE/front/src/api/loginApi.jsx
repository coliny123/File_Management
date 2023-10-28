import axios from 'axios';

const Server_IP = process.env.REACT_APP_Server_IP;

export const loginApi = async (provider, code) => {
    return await axios.post(`${Server_IP}/auth/${provider}`, { authCode: code })
    .then((res) => {
        console.log(res.data)
        if (res.data.token !== undefined) {
            window.localStorage.setItem('refreshToken', res.data.refreshToken);
            alert(res.data)
            console.log(res.data)
            return res.data.token;
        }
    })
    .catch((err) => {
        alert(err)
        console.log(err)
    })
}

export default loginApi;


