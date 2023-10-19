import React, { useState } from 'react'

const fileInfoRow = (fileInfo, idx, handleTogglebar) => {
    return(
        <div onClick={() => handleTogglebar(fileInfo)} className={`flex justify-around hover:cursor-pointer ${idx !== 0 ? 'border-t border-b' : ''}`} >
            <div>{fileInfo?.fileName}</div>
            <div>{fileInfo?.fileUploadedDate}</div>
            <div>{fileInfo?.fileSharePermission}</div>
        </div>
    )
}

function FileList({fileInfoList}) {
  
    const [isTogglebarOpen, setIsTogglebarOpen] = useState(false);
    const [togglebarDataInfo, setTogglebarDataInfo] = useState({});
    
    const handleTogglebar = (fileInfo) => {
       setTogglebarDataInfo(fileInfo)
        setIsTogglebarOpen(true)
    }

    return (
    <div>
      <div className='flex justify-around'>
        <div>파일명</div>
        <div>업로드일</div>
        <div>공유권한</div>
      </div>
      <div>
        {fileInfoList.map((fileInfo, idx) =>
            fileInfoRow(fileInfo, idx, handleTogglebar)
        )}
      </div>
        {/* <div className={`z-10 fixed top-0 right-24 flex-col w-24 bg-green-500 h-full transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '' : '-translate-x-full'}`}>
            {togglebarDataInfo?.fileName}
            <div>토글</div>
            <div>토글</div>
            <div>토글</div>
        </div> */}
        <div className={`z-10 fixed top-[80px] right-0 flex-col md:w-80 w-60 bg-green-500 h-full transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '' : 'translate-x-full'}`}>
            {togglebarDataInfo?.fileName}
            <div onClick={() => setIsTogglebarOpen(false)}>닫기버튼</div>
            <div>토글</div>
            <div>토글</div>
            <div>토글</div>
        </div>

    </div>
  )
}

export default FileList
