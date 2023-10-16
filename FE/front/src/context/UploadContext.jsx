import React, { createContext, useContext, useState } from 'react'
import { UploadProgressProvider } from './UploadProgressContext';

const UploadContext = createContext();

// 0: 파일 업로드 전, 1: 파일 업로드 중, 2: 파일 업로드 완료
export function UploadProvider({ children }) {

    const [uploadStatus, setUploadStatus] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState([]);
    
    return (
        <UploadContext.Provider value={{ uploadStatus, setUploadStatus, uploadProgress, setUploadProgress, uploadedFile, setUploadedFile }}>
            {children}
        </UploadContext.Provider>
    )
}

export function useUpload() {
    return useContext(UploadContext)
}