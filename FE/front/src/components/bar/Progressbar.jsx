import React, { useContext } from 'react'
import { useUploadProgress } from '../../context/UploadProgressContext';

function Progressbar({ progress }) {
    const { uploadProgress } = useUploadProgress();

    return (
        <div>
            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
            <div className="progress-text">{`${uploadProgress}%`}</div>
        </div>
    );
}

export default Progressbar
