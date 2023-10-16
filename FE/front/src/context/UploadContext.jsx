import React, { createContext, useContext, useState } from 'react'

const UploadContext = createContext();

// 0: 파일 업로드 전, 1: 파일 업로드 중, 2: 파일 업로드 완료
export function UploadProvider({ children }) {

    const [uploadStatus, setUploadStatus] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(10);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [uploadedFileType, setUploadedFileType] = useState('');

    return (
        <UploadContext.Provider value={{ uploadStatus, setUploadStatus, uploadProgress, setUploadProgress, uploadedFile, setUploadedFile, uploadedFileType, setUploadedFileType }}>
            {children}
        </UploadContext.Provider>
    )
}

export function useUpload() {
    return useContext(UploadContext)
}