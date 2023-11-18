import React, { useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react';
import { Switch } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { setSharedStatusApi } from '../../api/setSharedStatusApi';
import { isEqual } from 'lodash';
import { deleteExtensionsInFileName } from '../../services/deleteExtensionInFileName';
import { useIsLogin } from '../../context/IsLoginContext';

const transferedSize = (size) => size / 1048576 > 0.1 ? `${(size / 1048576).toFixed(2)}Mb` : `${(size / 1024).toFixed(2)}Kb`;

const FileInfoRow = (fileInfo, idx, handleTogglebar, refetch) => {

    const [sharedStatus, setSharedStatus] = useState(fileInfo?.shared);

    const handleChange = async (event) => {
        event.stopPropagation();
        try {
            await setSharedStatusApi(fileInfo.fileId, !sharedStatus);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div key={idx} className={`flex justify-center items-center hover:cursor-pointer ${idx !== 0 ? 'border-t border-b' : ''} w-full h-[60px] rounded-[10px] bg-white`} >
            <div className='allowedToggleArea w-full flex ml-5 items-center' onClick={() => handleTogglebar(fileInfo)}>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis w-[20%]'>{deleteExtensionsInFileName(fileInfo?.fileName)}</div>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis w-[20%]'>{fileInfo?.originFormat}</div>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis w-[20%]'>{transferedSize(fileInfo?.fileSize)}</div>
                <div className='whitespace-nowrap overflow-hidden text-ellipsis w-[20%]'>{fileInfo?.uploadTime.split('.')[0].split('T').join(' ')}</div>
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

function FileList({fileInfoList, refetch}) {
  
    const [isTogglebarOpen, setIsTogglebarOpen] = useState(false);
    const [togglebarDataInfo, setTogglebarDataInfo] = useState({});

    const handleTogglebar = (fileInfo) => {
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
    return (
    <div className='w-full'>
      <div className='w-full space-y-4 mt-5'>
        {fileInfoList && fileInfoList?.map((fileInfo, idx) =>
            FileInfoRow(fileInfo, idx, handleTogglebar, refetch)
        )}
      </div>
        <div className={`z-[1000] fixed top-[80px] -right-60 md:-right-80 flex-col items-center justify-center md:w-80 w-60 h-full bg-[#FBFBFD] transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '-translate-x-full': ''}`}>
            <div className='absolute top-[10px] left-[10px] w-[20px] h-[20px] text-xl hover:cursor-pointer' onClick={() => setIsTogglebarOpen(false)}><IoClose/></div>
            <div className='w-full flex justify-center'>
                <div className='bg-[#F7F7F7] max-md:w-[200px] max-md:h-[200px] w-[240px] h-[240px] flex justify-center items-center mt-[48px]'>
                    <QRCodeCanvas value={`https://file-management-ten.vercel.app/download/${togglebarDataInfo?.fileId}`}></QRCodeCanvas>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='max-md:w-[200px] w-[240px] mt-5'>
                    <div className='flex justify-between'><p>파일명</p><p className='w-[70%] text-right break-all'>{deleteExtensionsInFileName(togglebarDataInfo?.fileName)}</p></div>
                    <div className='flex justify-between'><p>확장자</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{togglebarDataInfo?.originFormat}</p></div>
                    <div className='flex justify-between'><p>날짜</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right max-md:text-sm flex justify-end items-center'>{togglebarDataInfo?.uploadTime?.split('.')[0]?.split('T')?.join(' ')}</p></div>
                    <div className='flex justify-between'><p>파일 크기</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{transferedSize(togglebarDataInfo?.fileSize)}</p></div>
                    <div className='flex justify-between'><p>공유 권한</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{togglebarDataInfo?.shared ? '허용' : '차단'}</p></div>
                    <div className='flex justify-between'><p>다운 코드</p><p className='whitespace-nowrap overflow-hidden text-ellipsis text-right'>{togglebarDataInfo?.downloadCode}</p></div>
                </div>
            </div>
            <div className='bg-[#6367EB] relative bottom-[20px] max-md:left-[20px] left-[40px] w-[60px]'>파일 삭제</div>
            <div className='bg-[#6367EB] relative bottom-[20px] max-md:left-[20px] right-[40px] w-[60px]'>다운로드</div>
        </div>

    </div>
  )
}

export default FileList
