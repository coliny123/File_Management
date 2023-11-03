import axios from "axios"

export const getAccessTokenApi = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const Server_IP = process.env.REACT_APP_Server_IP;
    const accessToken = axios.get(`${Server_IP}/auth/refresh`, {
        headers: {
            "Authorization": `Bearer ${refreshToken}`
        },
    })
    // const accessToken = axios.get(`https://9fbda4cd-cd09-4227-8f94-f3943b8e6686.mock.pstmn.io/auth/refresh`)
        .then((res) => {
            console.log(res.data)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
        });

    return accessToken
}