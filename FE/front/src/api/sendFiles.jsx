import React, { useContext } from 'react'
import axios from 'axios';

// 여기서 파일 id 가져와야 함
export const sendFiles = async (files, setUploadProgress, transferredFileFormat, uploadedFileType) => {
    const formData = new FormData();
    const Server_IP = process.env.REACT_APP_Server_IP;
    // files에서 forData에 파일 추가
    files.map((file) => {
        formData.append('file', file.object)
    })

    formData.append('originFormat', uploadedFileType)
    formData.append('transferredFormat', transferredFileFormat)

    // await axios.post('http://165.246.243.15:8080/upload', formData, {
    await axios.post(`${Server_IP}/upload`, formData, {
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
        console.log(res.data)
        console.log('complete');
        return res.data.id
    }).catch((error) => {
        console.log(error);
    })
}