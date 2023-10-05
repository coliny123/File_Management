import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function QrCode(url) {
  return (
    <div>
      <QRCodeCanvas value={url}></QRCodeCanvas>
    </div>
  )
}

export default QrCode
