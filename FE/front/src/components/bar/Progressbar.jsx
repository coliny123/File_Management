import React, { useContext, useEffect } from 'react'
import { useUpload } from '../../context/UploadContext';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

// function Progressbar({ progress }) {
function Progressbar() {
    const { uploadProgress, setUploadStatus } = useUpload();

    useEffect(() => {
        console.log(uploadProgress)
        if (uploadProgress === 100) {
            setUploadStatus(3);
        }
    }, [uploadProgress])

    return (
      <div className='w-full h-full flex flex-col justify-center items-center'>
          <div className='w-full h-full border-2 flex justify-center items-center'>
              <CircularProgressbarWithChildren
                value={uploadProgress} // 수정할 값
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
            </CircularProgressbarWithChildren>
          </div>
          <div className='btns bg-blue-500 text-white w-[160px] h-[56px] mt-10 flex justify-around items-center'>
                <button onClick={() => setUploadStatus(3)}>Upload끝</button>
          </div>
      </div>
    )
}

export default Progressbar
