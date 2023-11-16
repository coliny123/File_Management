import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsLogin } from '../../context/IsLoginContext'
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useUpload } from '../../context/UploadContext';
import { sendFiles } from '../../api/sendFiles';
import { useFileInfo } from '../../context/FileInfoContext';
import { getAccessTokenApi } from '../../api/getAccessTokenApi';

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
                setFormatOptions(['hwp'])
                break;
            case ('pdf'):
                setFormatOptions(['pdf'])
                break;
            case ('word'):
                setFormatOptions(['word'])
                break;
            case ('ppt'):
                setFormatOptions(['ppt'])
                break;
            }
    }, [uploadedFileType])

    return ( 
        <div className='flex flex-col justify-center items-center'>
            <div className='w-[230px]'>
                <div className='text-2xl font-bold mt-5'>확장자 선택</div>
                <div className='text-xl font-bold'>(추후 파일 변환 기능 추가)</div>
                <div className='flex items-center mt-5 h-[32px] justify-between'>
                    <div className='text-gray-500 text-[14px]'>올린 파일</div>
                    <div className='w-[160px] h-[32px] flex justify-center items-center'>
                    {/* <div className='rounded-[80px] bg-[#FFFFFF] w-[160px] h-[32px] flex justify-center items-center'>{uploadedFileType}</div> */}
                    <FormControl fullWidth fullHeight>
                        <InputLabel id='select-label'>형식</InputLabel>
                        <Select className='w-full' labelId='select-label' value={uploadedFileType} label='format' onChange={(e) => setTransferredFileFormat(e.target.value)}>
                            <MenuItem key={uploadedFileType} value={uploadedFileType}>{uploadedFileType}</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                </div>
                <div className='flex items-center mt-7 h-[32px] justify-between'>
                    <div className='text-gray-500 text-[14px]'>확장자 선택</div>
                    <div className='w-[160px] h-[32px] flex justify-center items-center'>
                        <FormControl fullWidth fullHeight>
                            <InputLabel id='select-label'>형식</InputLabel>
                            <Select className='w-full' labelId='select-label' value={transferredFileFormat} label='format' onChange={(e) => setTransferredFileFormat(e.target.value)}>
                                {formatOptions?.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Convert() {

    const [transferredFileFormat, setTransferredFileFormat] = useState('')
    const { isLogin, setIsLogin } = useIsLogin();
    const { setUploadStatus, uploadedFile, setUploadProgress, uploadedFileType} = useUpload();
    const { fileId, setFileId } = useFileInfo();

    const sendFilesWithAccessToken = async () => {
        try {
            const id = await sendFiles(uploadedFile, setUploadProgress, transferredFileFormat, uploadedFileType);
            console.log(id);
            return id;
        } catch (err) {
            await getAccessTokenApi();
            return sendFilesWithAccessToken()
        }
    }

    const handleNextBtn = async () => {
        const id = await sendFilesWithAccessToken();
        if (id === undefined) {
            alert('파일 전송에 실패했습니다. 다시 시도해주세요.')
            window.location.reload();
            return;
        }
        setFileId(id);
        setUploadStatus(2)
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            {/* <div className='w-full h-full border-2'> */}
            <div className="w-full h-full flex flex-col justify-center items-center border-4 bg-[#F7F6FB]" style={{borderRadius: "30px", background: "linear-gradient(100deg, rgba(255, 255, 255, 0.25) 5.69%, rgba(255, 255, 255, 0.15) 98.55%)", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", backdropFilter: "blur(25px)"}}>
                {/* {!isLogin ? <IsLoginConvert transferredFileFormat={transferredFileFormat} setTransferredFileFormat = {setTransferredFileFormat}></IsLoginConvert> : <IsNotLoginConvert></IsNotLoginConvert>} */}
                <IsLoginConvert transferredFileFormat={transferredFileFormat} setTransferredFileFormat = {setTransferredFileFormat}></IsLoginConvert>
            </div>
            <div className={`btns relative text-white w-[160px] h-[56px] mt-10 flex justify-center items-center ${transferredFileFormat === '' ? 'bg-blue-200' : 'bg-blue-500'}`}>
                <button onClick={handleNextBtn} disabled={transferredFileFormat === '' ? true : false} className='h-full w-full'>Next</button>
            </div>
        </div>
  )
}

export default Convert