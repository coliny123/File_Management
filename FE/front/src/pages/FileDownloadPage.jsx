import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function FileDownloadPage() {


  // useEffect로 api / 파일 id를 보내서 다운로드 링크를 받아옴
  // useEffect로 지금 현재 파일 다운 가능한지 서버로 요청 보내봐야함

	const { fileId } = useParams();

    return (
    <div className='w-full h-screen bg-[#F7F6FB] flex flex-col items-center'>
      <div text-neutral-600 className='font-bold mt-[80px]'> {`${fileId} 파일 다운로드`} </div>
      <div className='m-[32px] flex flex-col'>
        <div className='bg-[#ffffff] w-[120px] h-[160px] rounded-[6px] mt-[32px]'></div>
            <div className='w-[240px]'>
                <div className='flex justify-between'><p>파일명</p><p>A</p></div>
                <div className='flex justify-between'><p>확장자</p><p>B</p></div>
                <div className='flex justify-between'><p>올린 날짜</p><p>C</p></div>
                <div className='flex justify-between'><p>공유 권한</p><p>DDD</p></div>
                <div className='flex justify-between'><p>다운 코드</p><p>EEEE</p></div>
            </div>
      </div>
      <div className='text-white bg-[#6367EB] w-[200px] h-[48px] rounded-[4px] m-[32px] justify-center items-center'><button className='m-[10px]' >download</button></div>
      {/* 글씨를 버튼 가운데로 하고 싶어요.. */}
    </div>
  )
}

export default FileDownloadPage
