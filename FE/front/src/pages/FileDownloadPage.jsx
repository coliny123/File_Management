import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function FileDownloadPage() {

  const Server_IP = process.env.REACT_APP_Server_IP;
  const [fileLink, setFileLink] = useState('');
  // useEffect로 api / 파일 id를 보내서 다운로드 링크를 받아옴
  // useEffect로 지금 현재 파일 다운 가능한지 서버로 요청 보내봐야함
	const { fileId } = useParams();
  
  const getFileInfo = async (fileId) => {
    try {
      const response = await axios.get(`${Server_IP}/download/${fileId}`);
      setFileLink(response.data)
      console.log(response.data)
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    getFileInfo(fileId);
  }, [])

  return (
    <div>
      {`${fileId} 파일입니다.`}
      <div className='bg-yellow-500'><button onClick={() => {window.open(fileLink, '_blank')}}>download</button></div>
    </div>
  )
}

export default FileDownloadPage
