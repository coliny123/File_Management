import React from 'react'
import { useParams } from 'react-router-dom'


function FileDownloadPage() {

  // useEffect로 api / 파일 id를 보내서 다운로드 링크를 받아옴


    const { fileId } = useParams();
    
    return (
    <div>
      {`${fileId} 파일입니다.`}
    </div>
  )
}

export default FileDownloadPage
