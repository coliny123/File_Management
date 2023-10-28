import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react';
import { Switch } from '@mui/material';

const fileInfoRow = (fileInfo, idx, handleTogglebar) => {
    return(
        <div key={idx} className={`flex justify-around items-center hover:cursor-pointer ${idx !== 0 ? 'border-t border-b' : ''} w-full h-[60px] rounded-[10px] bg-white `} >
            <div className='allowedToggleArea w-full flex justify-around' onClick={() => handleTogglebar(fileInfo)}>
                <div>{idx}</div>
                <div>{fileInfo?.fileName}</div>
                <div>{fileInfo?.fileUploadedDate}</div>
                <div>{fileInfo?.fileSharePermission}</div>
            </div>
            <div className='notAllowedToggleArea' onClick={() => console.log(idx)}>
                <Switch/>
            </div>
        </div>
    )
}


function FileList({fileInfoList}) {
  
    const [isTogglebarOpen, setIsTogglebarOpen] = useState(false);
    const [togglebarDataInfo, setTogglebarDataInfo] = useState({});
    
    const handleTogglebar = (fileInfo) => {
        if (!isTogglebarOpen) {
            setIsTogglebarOpen(true);
            setTogglebarDataInfo(fileInfo)
        } else if (isTogglebarOpen && togglebarDataInfo === fileInfo) {
            setIsTogglebarOpen(false);
        } else if (isTogglebarOpen && togglebarDataInfo !== fileInfo) {
            setTogglebarDataInfo(fileInfo)
        }
    }

    return (
    <div className='w-full'>
      <div className='flex justify-around w-full border-4 border-b-orange-800'>
        <div>파일명</div>
        <div>확장자</div>
        <div>업로드일</div>
        <div>공유허용</div>
      </div>
      <div className='w-full space-y-4 mt-5'>
        {fileInfoList.map((fileInfo, idx) =>
            fileInfoRow(fileInfo, idx, handleTogglebar)
        )}
      </div>
        {/* <div className={`z-10 fixed top-[80px] right-0 flex-col md:w-80 w-60 bg-green-500 h-full transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '' : 'translate-x-full'}`}> */}
        <div className={`z-[1000] fixed top-[80px] right-0 flex-col md:w-80 w-60 h-full bg-green-500 transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '' : 'translate-x-full'}`}>
            <div>{togglebarDataInfo?.fileName}</div>
            <div onClick={() => setIsTogglebarOpen(false)}>닫기버튼</div>
            <QRCodeCanvas value={`http://192.168.45.81:3000/download/${togglebarDataInfo?.fileId}`}></QRCodeCanvas>
            <div>토글</div>
            <div>토글</div>
            <div>토글</div>
        </div>

    </div>
  )
}

export default FileList
