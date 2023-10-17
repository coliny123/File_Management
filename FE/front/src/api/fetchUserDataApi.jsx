import axios from 'axios'

export const fetchUserDataApi = async () => {
    // 액세스 토큰을 담아서 서버로 보내고 데이터를 받아오는 로직
    await axios.get('서버주소',
        {
            headers: {
                "Authorization": `Bearer ${Cookies.get("accessToken")}`
            },
        })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export default fetchUserDataApi
