import React from 'react'
import { useState } from 'react'
import { getFileIdByAuthCode } from '../api/getFileIdByAuthCode';
import { useNavigate } from 'react-router-dom';

function DownloadCodePage() {

  const [downloadCode, setDownloadCode] = useState('');

  const navigate = useNavigate();

  const handleDownloadButton = () => {
    const fileId = getFileIdByAuthCode(downloadCode);
    navigate(`https://file-management-ten.vercel.app/download/${fileId}`)
  }

  return (
    <div className='flex justify-center'>
      <div className='content-wrapper w-full h-full flex flex-col justify-center items-center '>
        <div>인증코드 입력</div>
        <div className='flex'>
          <div className='bg-blue-500'><input type="text" value={downloadCode} onChange={(e) => setDownloadCode(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {handleDownloadButton()}}}/></div>
          <div><button onClick={handleDownloadButton}>다운로드</button></div>
        </div>
      </div>
    </div>
  )
}

export default DownloadCodePage