import axios from 'axios'

export const fetchUserDataApi = async () => {
    // 액세스 토큰을 담아서 서버로 보내고 데이터를 받아오는 로직
    const Server_IP = process.env.REACT_APP_Server_IP;
    await axios.get(`${Server_IP}/test/me`)
        .then((res) => {
            console.log(res.data);
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export default fetchUserDataApi
