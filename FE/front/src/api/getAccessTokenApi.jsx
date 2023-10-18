import axios from "axios"

export const getAccessTokenApi = () => {
    const refreshToken = window.localStorage.get('refreshToken');

    const accessToken = axios.post('서버의 getAccessToken 앤드포인트', {

    })

    return accessToken
}