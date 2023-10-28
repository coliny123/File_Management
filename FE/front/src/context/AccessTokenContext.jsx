import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AccessTokenContext = createContext();

export function AccessTokenProvider({ children }) {

    const [accessToken, setAccessToken] = useState('');

    // const updateAccessToken = async () => {
    //     axios.post('서버 주소', {token: window.localStorage.get('refreshToken')})
    //     .then((res) => setAccessToken(res.data.token))
    // }

    return (
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AccessTokenContext.Provider>
  )
}

export function useAccessToken() {
    return useContext(AccessTokenContext)
}