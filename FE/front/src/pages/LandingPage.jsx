import React from 'react'
import GoogleLoginBtn from '../components/btn/GoogleLoginBtn'
import NaverLoginBtn from '../components/btn/NaverLoginBtn'
import KakaoLoginBtn from '../components/btn/KakaoLoginBtn'
import FileDragDrop from '../components/dragDrop/FileDragDrop'
import FileStatusbar from '../components/bar/FileStatusbar'
import QrCode from '../components/qrCode/QrCode'
import useUser from '../hooks/query/useUser'

function LandingPage() {

  // const user = useUser();
  // console.log(user)
  return (
    <div>
        <FileStatusbar></FileStatusbar>
        <GoogleLoginBtn></GoogleLoginBtn>
        <NaverLoginBtn></NaverLoginBtn>
        <KakaoLoginBtn></KakaoLoginBtn>
        <FileDragDrop></FileDragDrop>
        <QrCode url='http://192.168.0.8:3000/download/1'></QrCode>
        {/* <QrCode url='http://www.naver.com'></QrCode> */}
    </div>
  )
}

export default LandingPage
