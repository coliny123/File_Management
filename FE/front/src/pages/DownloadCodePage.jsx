import React from 'react'
import { useState } from 'react'
import { getFileIdByAuthCode } from '../api/getFileIdByAuthCode';
import { useNavigate } from 'react-router-dom';

function DownloadCodePage() {

  const [downloadCode, setDownloadCode] = useState('');

  const navigate = useNavigate();

  const handleDownloadButton = async () => {
    const fileId = await getFileIdByAuthCode(downloadCode);
    console.log(fileId)
    navigate(`/download/${fileId}`)
  }

  return (
    <div className='flex justify-center'>
      <div className='content-wrapper w-full h-full flex flex-col justify-center items-center'>
        <div className='text-2xl mt-20'>인증코드 입력</div>
        <div className='flex w-full justify-center items-center'>
          <div className='bg-white w-[60%] h-10 rounded-full'><input className='w-full h-full rounded-full text-center text-2xl' type="text" value={downloadCode} onChange={(e) => setDownloadCode(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {handleDownloadButton()}}}/></div>
          <div><button onClick={handleDownloadButton}>다운로드</button></div>
        </div>
      </div>
    </div>
  )
}

export default DownloadCodePage