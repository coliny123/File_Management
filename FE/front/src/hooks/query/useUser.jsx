import React from 'react'
import { useQuery } from 'react-query'
import { loginApi } from '../../api/loginApi'

function useUser() {
    return useQuery("user", loginApi)
}

export default useUser
