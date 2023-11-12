import axios from "axios"

export const getAccessTokenApi = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const Server_IP = process.env.REACT_APP_Server_IP;
    const accessToken = axios.get(`${Server_IP}/auth/refresh`, {
        headers: {
            "Authorization": `Bearer ${refreshToken}`
        },
    })
        .then((res) => {
            console.log(res.data)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
        });

    return accessToken
}