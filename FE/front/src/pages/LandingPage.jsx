import React from 'react'
import GoogleLoginBtn from '../components/btn/GoogleLoginBtn'
import NaverLoginBtn from '../components/btn/NaverLoginBtn'
import KakaoLoginBtn from '../components/btn/KakaoLoginBtn'
import FileDragDrop from '../components/dragDrop/FileDragDrop'
import FileStatusbar from '../components/bar/FileStatusbar'

function LandingPage() {
  return (
    <div>
        <FileStatusbar></FileStatusbar>
        <GoogleLoginBtn></GoogleLoginBtn>
        <NaverLoginBtn></NaverLoginBtn>
        <KakaoLoginBtn></KakaoLoginBtn>
        <FileDragDrop></FileDragDrop>
    </div>
  )
}

export default LandingPage
