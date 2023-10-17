import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../context/IsLoginContext'
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useUpload } from '../../context/UploadContext';
import { sendFiles } from '../../api/sendFiles';
import { useFileInfo } from '../../context/FileInfoContext';

function IsNotLoginConvert() {

    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center' >
            <div className='text-xl font-bold mt-[120px]'>로그인 후 이용 가능</div>
            <div className='w-[160px] h-[56px] flex justify-center items-center text-white bg-gray-300 mt-10 hover:cursor-pointer' onClick={() => navigate('/login')}>Login</div>
        </div>
    )
}

function IsLoginConvert({ transferredFileFormat, setTransferredFileFormat }) {

    const [formatOptions, setFormatOptions] = useState([]);

    const { uploadedFileType } = useUpload();

    useEffect(() => {
        switch (uploadedFileType) {
            case ('hwp'):
                setFormatOptions(['hwp', 'pdf'])
                break;
            case ('pdf'):
                setFormatOptions(['pdf'])
                break;
            }
    }, [uploadedFileType])

    return ( 
        <div className='flex flex-col justify-center items-center'>
            <div className='w-[161px]'>
                <div className='text-2xl font-bold mt-5'>파일 변환</div>
                <div className='text-gray-500 w-full text-left mt-5'>올린 파일</div>
                <div className='border-2 w-full h-10 flex justify-center items-center'>{uploadedFileType}</div>
                <div className='text-gray-500 w-full text-left mt-5 mb-5'>확장자 선택</div>
                <FormControl fullWidth>
                    <InputLabel id='select-label'>형식</InputLabel>
                    <Select className='w-full' labelId='select-label' value={transferredFileFormat} label='format' onChange={(e) => setTransferredFileFormat(e.target.value)}>
                        {formatOptions?.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

function Convert() {

    const [transferredFileFormat, setTransferredFileFormat] = useState('')
    const { isLogin, setIsLogin } = useIsLogin();
    const { setUploadStatus, uploadedFile, setUploadProgress, uploadedFileType } = useUpload();
    const { fileId, setFileId } = useFileInfo();

    const handleNextBtn = () => {
        // setFileId(sendFiles(uploadedFile, setUploadProgress))
        sendFiles(uploadedFile, setUploadProgress, transferredFileFormat, uploadedFileType)
        setUploadStatus(2)
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full h-full border-2'>
                {!isLogin ? <IsLoginConvert transferredFileFormat={transferredFileFormat} setTransferredFileFormat = {setTransferredFileFormat}></IsLoginConvert> : <IsNotLoginConvert></IsNotLoginConvert>}
            </div>
            <div className='btns bg-blue-500 text-white w-[160px] h-[56px] mt-10 flex justify-center items-center'>
                <button onClick={handleNextBtn}>Next</button>
            </div>
        </div>
  )
}

export default Convert
