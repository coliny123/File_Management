import React, { createContext, useContext, useEffect, useState } from 'react'

const IsLoginContext = createContext();

function IsLoginProvider({ children }) {
  
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => { 
        if (window.localStorage.getItem('refreshToken')) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [isLogin])

    return (
      <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
        {children}
      </IsLoginContext.Provider>
  )
}

export function useIsLogin() {
    return useContext(IsLoginContext)
}