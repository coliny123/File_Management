import React from 'react'
import axios from 'axios';

export const sendFiles = (files) => {
    const formData = new FormData();

    // files에서 forData에 파일 추가
    files.map((file) => {
        console.log(file)
        formData.append(file.object.name, file.object)
    })
    axios.post('https://1c48efd1-2f26-4d83-8447-35b841d6d0d4.mock.pstmn.io/localhost:8080/fileSend', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // "Authorization": `Bearer ${Cookies.get("accessToken")}`
        }
    }).then((res) => {
        console.log('complete');
    }).catch((error) => {
        console.log(error);
    })
}