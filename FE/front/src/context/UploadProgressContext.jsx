import React, { createContext, useContext, useState } from 'react';

const UploadProgressContext = createContext();

export function UploadProgressProvider({ children }) {
    
    const [uploadProgress, setUploadProgress] = useState(0);

    return (
        <UploadProgressContext.Provider value={{ uploadProgress, setUploadProgress }}>
            {children}
        </UploadProgressContext.Provider>
    );
}

export function useUploadProgress() {
    return useContext(UploadProgressContext);
}