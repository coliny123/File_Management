import React, { useContext } from 'react'
import axios from 'axios';
import { useUploadProgress } from '../context/UploadProgressContext';

export const sendFiles = (files, setUploadProgress) => {
    const formData = new FormData();

    // files에서 forData에 파일 추가
    files.map((file) => {
        formData.append('file', file.object)
    })
    axios.post('http://192.168.1.154:8080/upload', formData, {
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
    }).catch((error) => {
        console.log(error);
    })
}