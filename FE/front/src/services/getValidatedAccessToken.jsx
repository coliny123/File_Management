import React from 'react'
import moment from 'moment/moment'
import { getAccessTokenApi } from '../api/getAccessTokenApi'

export const getValidatedAccessToken = (accessToken, setAccessToken, accessTokenExpire) => {
    const refreshToken = window.localStorage.get('refreshToken')
    
    if (moment(accessTokenExpire).diff((moment())) < 0 && refreshToken) {
        setAccessToken(getAccessTokenApi())
        // 서버로 refresh보내서 accessToken 받아서 set에 세팅
    }

    return accessToken
}