import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useUpload } from '../../context/UploadContext'
import { useFileInfo } from '../../context/FileInfoContext';

function QrCode() {

    const { setUploadStatus, setUploadedFile } = useUpload();
    const { fileId } = useFileInfo();

  // const handleQRCodeOpen = () => {
  //   const qrCodeCanvas = document.querySelector('.qr-code-canvas'); // .qr-code-canvas 클래스로 캔버스 요소 선택
  //   if (qrCodeCanvas) {
  //     const qrCodeDataURL = qrCodeCanvas.toDataURL(); // QR 코드 캔버스의 이미지 데이터 URL을 가져옴

  //     const newTab = window.open('', '', 'width=300, height=300');
  //     newTab.document.write(`
  //     <html>
  //       <head>
  //         <title>QR Code</title>
  //       </head>
  //       <body style="margin: 0; text-align: center;">
  //         <img src="${qrCodeDataURL}" alt="QR Code" width="300" height="300" />
  //       </body>
  //     </html>
  //   `);
  //   }
  // };

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
          <div className='w-full h-full border-2 flex justify-center items-center'>
              <QRCodeCanvas className='qr-code-canvas' value={`http://192.168.219.103:3000/download/1`} size={250}></QRCodeCanvas>
              {/* <QRCodeCanvas value={`http://192.168.219.103:3000/download/${fileId}`} size={250}></QRCodeCanvas> */}
          </div>
          <div className='btns bg-blue-500 text-white w-[160px] h-[56px] mt-10 flex justify-around items-center'>
              <div>
                <button onClick={() => handleQRCodeOpen()}>QR Open</button>
              </div>
              <div>
                <button onClick={() => {setUploadedFile([]); setUploadStatus(0);}}>Finish</button>
              </div>
          </div>
      </div>
  )
}

export default QrCode
