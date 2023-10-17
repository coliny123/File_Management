import React, { useContext } from 'react'
import axios from 'axios';

// 여기서 파일 id 가져와야 함
export const sendFiles = async (files, setUploadProgress) => {
    const formData = new FormData();

    // files에서 forData에 파일 추가
    files.map((file) => {
        formData.append('file', file.object)
    })
    await axios.post('http://192.168.1.154:8080/upload', formData, {
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