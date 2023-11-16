import axios from "axios"

export const getFileIdByAuthCode = async (authCode) => {
    const Server_IP = process.env.REACT_APP_Server_IP;
    await axios.get(`${Server_IP}/download/${authCode}`)
    .then((res) => {
        console.log(res)
        return res.data;
    })
    .catch((err) => {
        alert('코드를 다시 확인해주세요.')
        console.log(err)
    })
}