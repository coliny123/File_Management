import axios from "axios"

const getFileIdByAuthCode = async (authCode) => {
    await axios.post('엔드포인트', {authCode: authCode})
    .then((res) => {
        return res.data.fileId
    })
    .catch((err) => {
        console.log(err)
    })
}