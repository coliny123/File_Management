import React from 'react'
import 

const fileInfoRow = (fileInfo) => {
    return(
        <div onClick={} className='flex justify-around'>
            <div>{fileInfo?.fileName}</div>
            <div>{fileInfo?.fileUploadedDate}</div>
            <div>{fileInfo?.fileSharePermission}</div>
        </div>
    )
}

function FileList({fileInfoList}) {
  return (
    <div>
      <div className='flex justify-around'>
        <div>파일명</div>
        <div>업로드일</div>
        <div>공유권한</div>
      </div>
      <div>
        {fileInfoList.map((fileInfo, idx) =>
            fileInfoRow(fileInfo)
        )}
      </div>
    </div>
  )
}

export default FileList
