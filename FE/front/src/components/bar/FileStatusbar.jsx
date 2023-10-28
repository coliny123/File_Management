import React from 'react'
import { useState } from 'react'
import { useUpload } from '../../context/UploadContext'

function FileStatusbar() {
    
    const {uploadStatus, setUploadStatus} = useUpload();
    
    const handleState = () => {
        setUploadStatus((pre) => pre === 3 ? 0 : pre + 1)
    }

    return (
        <div>
            <div className='wrapper flex justify-between'>
                <div className='content flex flex-col items-center'>
                    <div className={`uploadStatus rounded-full w-[16px] h-[16px] ${uploadStatus === 0 ? 'bg-[#6367EB]' : 'bg-[#999999]'} border-bg-500`}></div>
                    <div>Upload</div>
                </div>
                <div className='content flex flex-col items-center'>
                    <div className={`uploadStatus rounded-full w-[16px] h-[16px] ${uploadStatus === (1 || 2) ? 'bg-[#6367EB]' : 'bg-[#999999]'} border-bg-500`}></div>
                    <div>Convert</div>
                </div>
                 {/* <div className='content flex flex-col items-center'>
                    <div className={`uploadStatus rounded-full w-3 h-3 ${uploadStatus === 2 ? 'bg-blue-500' : ''} border-bg-500`}></div>
                    <div>Sending</div>
                </div> */}
                <div className='content flex flex-col items-center'>
                    <div className={`uploadStatus rounded-full w-[16px] h-[16px] ${uploadStatus === 3 ? 'bg-[#6367EB]' : 'bg-[#999999]'} border-bg-500`}></div>
                    <div>Share</div>
                </div>
            </div>
            {/* <button className='bg-red-500' onClick={handleState}>상태 바꾸기  / 테스트</button> */}
        </div>
    )
}

export default FileStatusbar
