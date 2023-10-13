import React, { useContext } from 'react'
import { useUploadProgress } from '../../context/UploadProgressContext';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

function Progressbar({ progress }) {
    const { uploadProgress } = useUploadProgress();

    return (
        <div>
            <CircularProgressbarWithChildren
                value={30} // 수정할 값
                strokeWidth={20}
                className={"mg mt-10"}
                styles={{
                    root: { height: "100px" },
                    path: {
                        stroke: "#4fce84",
                        strokeLinecap: "butt",
                        transition: "stroke-dashoffset 0.5s ease 0s",
                    },
                    trail: {
                        stroke: "#d7d7d7",
                    },
                    text: {
                        fill: "#333333",
                        fontSize: "18px",
                    },
                    background: {
                        fill: "#3e98c7",
                    },
                }}
            >
                <p>10</p>
            </CircularProgressbarWithChildren>
            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
            <div className="progress-text">{`${uploadProgress}%`}</div>
        </div>
    );
}

export default Progressbar
