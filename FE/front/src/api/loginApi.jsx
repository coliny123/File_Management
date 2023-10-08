// import React, { useEffect } from 'react'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';


// export const loginApi = async ({ code }) => {
//     const Server_IP = '';
//     const { provider } = useParams();
    
//     useEffect(() => {
//         axios.post(`${Server_IP}/auth/${provider}`, { authCode: code })
//             .then(res => {
//                 localStorage.setItem('token', res.data.token);
//                 window.location.href = 'http://localhost:3000'
    
//                 return res.data
//             })
//     }, [code, provider])
//     return
// }