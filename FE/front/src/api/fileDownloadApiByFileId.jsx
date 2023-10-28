import React from 'react'
import axios from 'axios'

const fileDownloadApiByFileId = async (fileId) => {
    await axios.get('앤드포인트', {fileId: fileId})
    .then((res) => {
        window.open(res.data.downloadLink, '_blank');
    })
}


export default fileDownloadApiByFileId
