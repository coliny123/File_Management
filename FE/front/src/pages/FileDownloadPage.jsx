import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function FileDownloadPage() {


  // useEffect로 api / 파일 id를 보내서 다운로드 링크를 받아옴
  // useEffect로 지금 현재 파일 다운 가능한지 서버로 요청 보내봐야함

	const { fileId } = useParams();

    return (
    <div>
      {`${fileId} 파일입니다.`}
      <div className='bg-yellow-500'><button>download</button></div>
    </div>
  )
}

export default FileDownloadPage
