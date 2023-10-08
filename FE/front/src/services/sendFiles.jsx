import React from 'react'
import axios from 'axios';

export const sendFiles = (files) => {
    const formData = new FormData();

    // files에서 forData에 파일 추가
    files.map((file) => {
        formData.append('file', file.object)
    })
    axios.post('http://192.168.0.10:8080/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((res) => {
        console.log('complete');
    }).catch((error) => {
        console.log(error);
    })
}