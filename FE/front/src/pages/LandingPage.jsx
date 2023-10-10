import React from 'react'
import FileDragDrop from '../components/dragDrop/FileDragDrop'
import FileStatusbar from '../components/bar/FileStatusbar'
import QrCode from '../components/qrCode/QrCode'
import useUser from '../hooks/query/useUser'
import Progressbar from '../components/bar/Progressbar'

function LandingPage() {

  // const user = useUser();
  // console.log(user)
  return (
    <div>
      배포테스트
        <FileStatusbar></FileStatusbar>
        <FileDragDrop></FileDragDrop>
        <QrCode url='http://192.168.0.8:3000/download/1'></QrCode>
        <Progressbar></Progressbar>
    </div>
  )
}

export default LandingPage
