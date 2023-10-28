import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAccessToken } from './AccessTokenContext';

const IsLoginContext = createContext();

export function IsLoginProvider({ children }) {

    const [isLogin, setIsLogin] = useState(false);
    const { accessToken } = useAccessToken();

    useEffect(() => {
        if (window.localStorage.getItem('refreshToken')) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [accessToken])

    return (
        <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </IsLoginContext.Provider>
    )
}

export function useIsLogin() {
    return useContext(IsLoginContext)
}