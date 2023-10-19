import React, { useContext } from 'react'
import axios from 'axios';

// 여기서 파일 id 가져와야 함
export const sendFiles = async (files, setUploadProgress, transferredFileFormat, uploadedFileType) => {
    const formData = new FormData();

    // files에서 forData에 파일 추가
    files.map((file) => {
        formData.append('file', file.object)
    })

    formData.append('originFormat', uploadedFileType)
    formData.append('transferredFormat', transferredFileFormat)

    await axios.post('http://192.168.45.137:8080/upload', formData, {
    // await axios.post('https://1c48efd1-2f26-4d83-8447-35b841d6d0d4.mock.pstmn.io/localhost:8080/fileSend', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
        },
    }).then((res) => {
        console.log('complete');
        // return res.data.fileId
    }).catch((error) => {
        console.log(error);
    })
}