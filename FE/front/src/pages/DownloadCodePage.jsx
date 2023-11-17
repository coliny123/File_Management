import React from 'react'
import { useState } from 'react'
import { getFileIdByAuthCode } from '../api/getFileIdByAuthCode';
import { useNavigate } from 'react-router-dom';

function DownloadCodePage() {

  const [downloadCode, setDownloadCode] = useState('');

  const navigate = useNavigate();

  const handleDownloadButton = async () => {
    const fileId = await getFileIdByAuthCode(downloadCode);
    if (fileId !== undefined && fileId !== null && fileId) {
      navigate(`/download/${fileId}`)
    } else {
      alert('인증코드를 확인해주세요.')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='content-wrapper w-full h-full flex flex-col justify-center items-center'>
        <img src="/assets/images/cloud_img.png" alt="google log" className='mt-10 w-[80px] h-[80px] object-cover object-center' />
        <div className='text-2xl font-bold'>파일 다운로드</div>
        <div className='text-lg w-[300px] mt-3 text-justify'>다른 사람이 공유한 파일을 다운받으려면,</div>
        <div className='text-lg w-[300px] text-left'>6자리로 된 공유 코드를 입력하세요.</div>
        <div className='text-lg font-bold mt-10 w-[300px] text-left ml-5'>공유 코드 입력</div>
        <div className='bg-white w-[300px] h-10 rounded-full mt-2'><input className='w-full h-full rounded-full text-center text-2xl' type="text" value={downloadCode} onChange={(e) => setDownloadCode(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') {handleDownloadButton()}}} placeholder='000000'/></div>
        <div className='w-32'><button className='text-white bg-[#6367EB] w-full h-[48px] rounded-[18px] mt-10' onClick={handleDownloadButton}>다운로드</button></div>
      </div>
    </div>
  )
}

export default DownloadCodePage