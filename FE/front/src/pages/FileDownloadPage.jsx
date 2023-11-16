import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function FileDownloadPage() {

  const Server_IP = process.env.REACT_APP_Server_IP;
  const [fileData, setFileData] = useState({});
  // useEffect로 api / 파일 id를 보내서 다운로드 링크를 받아옴
  // useEffect로 지금 현재 파일 다운 가능한지 서버로 요청 보내봐야함
	const { fileId } = useParams();
  
  const getFileInfo = async (fileId) => {
    try {
      return await axios.get(`${Server_IP}/details/${fileId}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  setFileData(getFileInfo(fileId));
  console.log(fileData)

    return (
    <div className='w-full h-screen bg-[#F7F6FB] flex flex-col items-center'>
      <div text-neutral-600 className='font-bold mt-[80px]'> {`파일 다운로드`} </div>
      {/* <div text-neutral-600 className='font-bold mt-[80px]'> {`${fileId} 파일 다운로드`} </div> */}
      <div className='m-[32px] flex flex-col'>
        {/* <div className='bg-[#ffffff] w-[120px] h-[160px] rounded-[6px] mt-[32px]'></div> */}
            <div className='w-[240px]'>
              <div className='w-full flex justify-center'>
                <div className='bg-[#ffffff] w-[120px] h-[160px] rounded-[6px] mt-[32px]'></div>
              </div>
              <div className='flex justify-between'><p>파일명</p><p>{fileData?.originalFileName}</p></div>
              <div className='flex justify-between'><p>확장자</p><p>{fileData?.split('.')[1]}</p></div>
              <div className='flex justify-between'><p>올린 날짜</p><p>{fileData?.uploadTime?.split('.')[0]?.split('T')?.join(' ')}</p></div>
              <div className='flex justify-between'><p>공유 권한</p><p>{fileData?.shared === true ? '허용' : fileData?.shared === false ? '차단' : ''}</p></div>
              <div className='flex justify-between'><p>다운 코드</p><p>{fileData?.authenticationCode}</p></div>
            </div>
      </div>
      <div className={`text-white flex bg-[#6367EB] w-[200px] h-[48px] rounded-[4px] m-[32px] justify-center items-center ${!fileData.shared ? 'opacity-50' : 'opacity-100'}`}><button onClick={() => {window.location = fileData.savedPath}} disabled={!fileData.shared} >download</button></div>
      {/* 글씨를 버튼 가운데로 하고 싶어요.. */}
    </div>
    )
}

export default FileDownloadPage
