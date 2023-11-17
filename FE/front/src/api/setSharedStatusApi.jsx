import axios from 'axios'

export async function setSharedStatusApi (fileId, status) {
    const Server_IP = process.env.REACT_APP_Server_IP;
    await axios.post(`${Server_IP}/setShared`, {
        id: fileId,
        shared: status,
    })
    .then((res) => {})
    .catch((err) => console.log(err))
}