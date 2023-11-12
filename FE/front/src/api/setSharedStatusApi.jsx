import axios from 'axios'

export function setSharedStatusApi(fileId, status) {
    const Server_IP = process.env.REACT_APP_Server_IP;
    axios.post(`${Server_IP}/setShared`, {
        id: fileId,
        shared: status === 1 ? false : true,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}