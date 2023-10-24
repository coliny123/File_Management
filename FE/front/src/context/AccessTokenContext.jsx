import React, { createContext, useContext, useState } from 'react';

const AccessTokenContext = createContext();

export function AccessTokenProvider({ children }) {

    const [accessToken, setAccessToken] = useState('');

    return (
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
            {children}            
        </AccessTokenContext.Provider>
  )
}

export function useAccessToken() {
    return useContext(AccessTokenContext)
}