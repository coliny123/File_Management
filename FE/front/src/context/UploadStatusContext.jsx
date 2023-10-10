import React, { createContext, useContext, useState } from 'react'

const UploadStatusContext = createContext();

export function UploadStatusContext() {

    const [uploadStatus, setUploadStatus] = useState(0);

    return (
        <UploadStatusContext.Provider value={{ uploadStatus, setUploadStatus }}>
            {children}
        </UploadStatusContext.Provider>
    )
}

export default UploadStatusContext
