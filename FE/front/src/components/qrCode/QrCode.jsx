import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useUpload } from '../../context/UploadContext'

function QrCode({url}) {

    const { setUploadStatus } = useUpload();

  return (
      <div className='w-full h-full flex flex-col justify-center items-center'>
          <div className='w-full h-full border-2 flex justify-center items-center'>
              <QRCodeCanvas value={url} size={250}></QRCodeCanvas>
          </div>
          <div className='btns bg-blue-500 text-white w-[160px] h-[56px] mt-10 flex justify-around items-center'>
              <div>
                <button>QR Copy</button>
              </div>
              <div>
                <button onClick={() => setUploadStatus(0)}>Finish</button>
              </div>
          </div>
      </div>
  )
}

export default QrCode
