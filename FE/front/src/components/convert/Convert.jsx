import React from 'react'
import { Navigate } from 'react-router-dom'
import { useIsLogin } from '../../context/IsLoginContext'

function IsNotLoginConvert() {
    return (
        <>
            <div>로그인 후 이용 가능</div>
            <div><button onClick={() => Navigate('/login')}>Login</button></div>
        </>
    )
}

function IsLoginConvert() {
    return (
        <div>
            <div>여기는 변환 페이지</div>
            <div>드롭박스</div>
            <div>변환 후 보내는 버튼</div>
        </div>
    )
}

function Convert() {
    const { isLogin, setIsLogin } = useIsLogin();

    return (
        <div>
            {isLogin ? <IsLoginConvert></IsLoginConvert> : <IsNotLoginConvert></IsNotLoginConvert>}
        </div>
  )
}

export default Convert
