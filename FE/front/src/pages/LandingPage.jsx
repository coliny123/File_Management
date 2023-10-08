import React from 'react'
import GoogleLoginBtn from '../components/btn/GoogleLoginBtn'
import NaverLoginBtn from '../components/btn/NaverLoginBtn'
import KakaoLoginBtn from '../components/btn/KakaoLoginBtn'
import FileDragDrop from '../components/dragDrop/FileDragDrop'

function LandingPage() {
  return (
    <div>
        <GoogleLoginBtn></GoogleLoginBtn>
        <NaverLoginBtn></NaverLoginBtn>
        <KakaoLoginBtn></KakaoLoginBtn>
        <FileDragDrop></FileDragDrop>
    </div>
  )
}

export default LandingPage
