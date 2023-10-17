import React, { createContext, useContext, useState } from 'react'

const FileInfoContext = createContext();

// 0: 파일 업로드 전, 1: 파일 업로드 중, 2: 파일 업로드 완료
export function FileInfoProvider({ children }) {

    const [fileId, setFileId] = useState('')

    return (
        <FileInfoContext.Provider value={{fileId, setFileId}}>
            {children}
        </FileInfoContext.Provider>
    )
}

export function useFileInfo() {
    return useContext(FileInfoContext)
}