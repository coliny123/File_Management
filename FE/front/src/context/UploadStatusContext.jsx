import React, { createContext, useContext, useState } from 'react'
import { UploadProgressProvider } from './UploadProgressContext';

const UploadStatusContext = createContext();

export const uploadStatues = {
    notUploaded : 0,
    uploading : 1,
    uploaded : 2,
}

// 0: 파일 업로드 전, 1: 파일 업로드 중, 2: 파일 업로드 완료
export function UploadStatusProvider({ children }) {

    const [uploadStatus, setUploadStatus] = useState(0);

    return (
        <UploadStatusContext.Provider value={{ uploadStatus, setUploadStatus }}>
            {children}
        </UploadStatusContext.Provider>
    )
}

export function useUploadStatus() {
    return useContext(UploadStatusContext)
}