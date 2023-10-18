import React, { createContext, useContext, useState } from 'react';

const AccessTokenContext = createContext();

export function AccessTokenProvider({ children }) {

    const [accessToken, setAccessToken] = useState('');
    const [accessTokenExpire, setAccessTokenExpire] = useState('');

    return (
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken, accessToken, setAccessTokenExpire }}>
            {children}            
        </AccessTokenContext.Provider>
  )
}

export function useAccessToken() {
    return useContext(AccessTokenContext)
}