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
        <div className={`z-[1000] fixed top-[80px] right-0 flex-col items-center justify-center md:w-80 w-60 h-full bg-white bg-opacity-50 transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '' : 'translate-x-full'}`}>
            <div>{togglebarDataInfo?.fileName}</div>
            <div onClick={() => setIsTogglebarOpen(false)}>닫기버튼</div>
            <div className='w-full flex justify-center'>
                <div className='bg-[#F7F7F7] w-[240px] h-[240px] flex justify-center items-center'>
                    <QRCodeCanvas value={`http://165.246.223.19:3000/download/${togglebarDataInfo?.fileId}`}></QRCodeCanvas>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-[240px] text-left'>파일 상세보기</div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-[240px]'>
                    <div className='flex justify-between'><p>파일명</p><p>A</p></div>
                    <div className='flex justify-between'><p>확장자</p><p>B</p></div>
                    <div className='flex justify-between'><p>올린 날짜</p><p>C</p></div>
                    <div className='flex justify-between'><p>공유 권한</p><p>DDD</p></div>
                    <div className='flex justify-between'><p>다운 코드</p><p>EEEE</p></div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default FileList
