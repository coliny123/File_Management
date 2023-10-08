import React from 'react'
import { useParams } from 'react-router-dom'


function FileDownloadPage() {

    const { fileId } = useParams();
    return (
    <div>
      {`${fileId} 파일입니다.`}
    </div>
  )
}

export default FileDownloadPage
