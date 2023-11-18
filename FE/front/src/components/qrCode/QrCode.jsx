import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useUpload } from '../../context/UploadContext'
import { useFileInfo } from '../../context/FileInfoContext';
import { useUserDataQuery } from '../../hooks/query/useUserDataQuery';

function QrCode() {


    const { setUploadStatus, setUploadedFile } = useUpload();
    const { fileId, setFileId } = useFileInfo();

  const handleQRCodeOpen = () => {
    const qrCodeCanvas = document.querySelector('.qr-code-canvas'); // .qr-code-canvas 클래스로 캔버스 요소 선택
    if (qrCodeCanvas) {
      const qrCodeDataURL = qrCodeCanvas.toDataURL(); // QR 코드 캔버스의 이미지 데이터 URL을 가져옴

      const newTab = window.open('', '', 'width=300, height=300');
      newTab.document.write(`
      <html>
        <head>
          <title>QR Code</title>
        </head>
        <body style="margin: 0; text-align: center;">
          <img src="${qrCodeDataURL}" alt="QR Code" width="300" height="300" />
        </body>
      </html>
    `);
    }
  };
    return (
      <div className='w-full h-full flex flex-col justify-center items-center'>
          <div className="w-full h-full flex flex-col justify-center items-center border-4 bg-[#F7F6FB]" style={{borderRadius: "30px", background: "linear-gradient(100deg, rgba(255, 255, 255, 0.25) 5.69%, rgba(255, 255, 255, 0.15) 98.55%)", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", backdropFilter: "blur(25px)"}}>
          <QRCodeCanvas className='qr-code-canvas' value={`https://file-management-ten.vercel.app/download/${fileId}`} size={250}></QRCodeCanvas>
          </div>
          <div className='btns bg-blue-500 text-white w-[160px] h-[56px] mt-10 flex justify-around items-center'>
              <div className='border-r-4 w-[60%] h-full border-[#DBDADE]'>
                <button onClick={() => handleQRCodeOpen()} className='w-full h-full'>QR Open</button>
              </div>
              <div className='w-[40%] h-full'>
                <button className='w-full h-full' onClick={() => {setUploadedFile([]); setUploadStatus(0);}}>Finish</button>
              </div>
          </div>
      </div>
  )
}

export default QrCode
