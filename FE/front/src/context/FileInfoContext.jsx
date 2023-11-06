import React, { createContext, useContext, useState } from 'react'

const FileInfoContext = createContext();

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