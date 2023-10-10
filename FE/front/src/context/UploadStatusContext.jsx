import React, { createContext, useContext, useState } from 'react'
import { UploadProgressProvider } from './UploadProgressContext';

const UploadStatusContext = createContext();

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