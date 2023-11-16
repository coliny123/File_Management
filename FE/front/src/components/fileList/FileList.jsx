import React, { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react';
import { Switch } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { setSharedStatusApi } from '../../api/setSharedStatusApi';
import { isEqual } from 'lodash';

const transferedSize = size / 1048576 > 0.1 ? `${(size / 1048576).toFixed(2)}Mb` : `${(size / 1024).toFixed(2)}Kb`;

const FileInfoRow = (fileInfo, idx, handleTogglebar) => {
    console.log(fileInfo)

    const [sharedStatus, setSharedStatus] = useState(fileInfo?.shared);
    // const [sharedStatus, setSharedStatus] = useState(false);

    const handleChange = async (event) => {
        console.log(sharedStatus)
        console.log(event)
        event.stopPropagation();
        try {
            await setSharedStatusApi(fileInfo.fileId, !sharedStatus)
            setSharedStatus((prevSharedStatus) => !prevSharedStatus);
        } catch (error) {
            console.error(error); // 에러 출력
        }
    }

    useEffect(() => {
        setSharedStatus(fileInfo?.shared);
    }, [fileInfo?.shared])

    return(
        <div key={idx} className={`flex justify-center items-center hover:cursor-pointer ${idx !== 0 ? 'border-t border-b' : ''} w-full h-[60px] rounded-[10px] bg-white`} >
            <div className='allowedToggleArea w-full flex ml-5 items-center' onClick={() => handleTogglebar(fileInfo)}>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis w-[20%]'>{fileInfo?.fileName}</div>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis w-[20%]'>{fileInfo?.originFormat}</div>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis w-[20%]'>{fileInfo?.uploadTime.split('.')[0].split('T').join(' ')}</div>
                {/* <div>{fileInfo?.downloadCode}</div> */}
                <div className='whitespace-nowrap overflow-hidden text-ellipsis w-[20%]'>{transferedSize(fileInfo?.fileSize)}</div>
                {/* <div>{fileInfo?.fileSharePermission}</div> */}
                {/* <div className='notAllowedToggleArea w-[20%]' onClick={() => console.log(idx)}>
                    <Switch
                        checked={sharedStatus.checked}
                        onChange={(e) => handleChange(e)}
                        name="checked"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div> */}
                <div className='notAllowedToggleArea w-[20%]' onClick={(e) => e.stopPropagation()}>
                    <Switch
                        checked={sharedStatus}
                        onChange={(e) => handleChange(e)}
                        name="checked"
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>

            </div>
        </div>
    )
}

function FileList({fileInfoList}) {
  
    const [isTogglebarOpen, setIsTogglebarOpen] = useState(false);
    const [togglebarDataInfo, setTogglebarDataInfo] = useState({});
    
    console.log(fileInfoList)
    console.log(togglebarDataInfo)
    const handleTogglebar = (fileInfo) => {
        console.log(togglebarDataInfo);
        if (isTogglebarOpen === false) {
            setIsTogglebarOpen(true);
            setTogglebarDataInfo(fileInfo)
        // } else if (isTogglebarOpen && togglebarDataInfo === fileInfo) {
        } else if (isTogglebarOpen && isEqual(togglebarDataInfo,fileInfo)) {
            setIsTogglebarOpen(false);
        } else if (isTogglebarOpen && !isEqual(togglebarDataInfo, fileInfo)) {
        // } else if (isTogglebarOpen && !isEqual(togglebarDataInfo !== fileInfo) {
            setTogglebarDataInfo(fileInfo)
        }
    }

    // fileInfoList = [
    //     {fileName: 'a', uploadTime: '123', shared: false, downloadCode: '123', fileId: 'abc', fileSize: 123},
    //     {fileName: 'b12345615615615615611561565616', uploadTime: '123', shared: true, downloadCode: '123', fileId: 'abc', fileSize: 123},
    //     {fileName: 'c', uploadTime: '123', shared: false, downloadCode: '123', fileId: 'abc', fileSize: 123},
    // ]

    return (
    <div className='w-full'>
      <div className='flex justify-around w-full border-b-4 border-b-[#999999] text-[#999999]'>
        <div className='w-[20%] ml-5'>파일명</div>
        <div className='w-[20%]'>확장자</div>
        <div className='w-[20%]'>파일크기</div>
        <div className='w-[20%]'>업로드일</div>
        <div className='w-[20%]'>공유허용</div>
      </div>
      <div className='w-full space-y-4 mt-5'>
        {fileInfoList && fileInfoList?.map((fileInfo, idx) =>
            FileInfoRow(fileInfo, idx, handleTogglebar)
        )}
      </div>
        <div className={`z-[1000] fixed top-[80px] -right-60 md:-right-80 flex-col items-center justify-center md:w-80 w-60 h-full bg-[#FBFBFD] transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '-translate-x-full': ''}`}>
            <div className='absolute top-[10px] left-[10px] w-[20px] h-[20px] text-xl hover:cursor-pointer' onClick={() => setIsTogglebarOpen(false)}><IoClose/></div>
            <div className='w-full flex justify-center'>
                <div className='bg-[#F7F7F7] w-[240px] h-[240px] flex justify-center items-center mt-[48px]'>
                    {/* <QRCodeCanvas value={`http://192.168.45.139:3000/download/${togglebarDataInfo?.fileId}`}></QRCodeCanvas> */}
                    <QRCodeCanvas value={`https://file-management-ten.vercel.app/download/${togglebarDataInfo?.fileId}`}></QRCodeCanvas>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-[240px] text-left'>파일 상세보기</div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-[240px]'>
                    <div className='flex justify-between'><p>파일명</p><p className='whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-right'>{togglebarDataInfo?.fileName}</p></div>
                    <div className='flex justify-between'><p>확장자</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{togglebarDataInfo?.originFormat}</p></div>
                    <div className='flex justify-between'><p>올린 날짜</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{togglebarDataInfo?.uploadTime.split('.')[0].split('T').join(' ')}</p></div>
                    <div className='flex justify-between'><p>파일 크기</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{transferedSize(togglebarDataInfo?.fileSize)}</p></div>
                    <div className='flex justify-between'><p>공유 권한</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{togglebarDataInfo?.shared}</p></div>
                    <div className='flex justify-between'><p>다운 코드</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{togglebarDataInfo?.downloadCode}</p></div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default FileList
