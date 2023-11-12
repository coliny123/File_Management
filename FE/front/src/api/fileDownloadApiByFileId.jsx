import React from 'react'
import axios from 'axios'

const fileDownloadApiByFileId = async (fileId) => {
    const Server_IP = process.env.REACT_APP_Server_IP;
    await axios.get(``, {fileId: fileId})
    .then((res) => {
        window.open(res.data.downloadLink, '_blank');
    })
}

export default fileDownloadApiByFileId