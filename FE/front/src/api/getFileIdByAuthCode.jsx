import axios from "axios"

export const getFileIdByAuthCode = async (authCode) => {
    const Server_IP = process.env.REACT_APP_Server_IP;
    await axios.get(`${Server_IP}/download/${authCode}`)
    .then((res) => {
        return res.data.id
    })
    .catch((err) => {
        console.log(err)
    })
}