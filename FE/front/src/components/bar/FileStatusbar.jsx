import React from 'react'
import { useState } from 'react'

function FileStatusbar() {

    const handleState = () => {
        setNowState((pre) => pre === 2 ? 0 : pre + 1)
        console.log(nowState)
    }

    const [nowState, setNowState] = useState(0)

    return (
        <div>
            <div className='wrapper flex justify-between'>
                <div className='content flex flex-col items-center'>
                    <div className={`uploadStatus rounded-full w-3 h-3 ${nowState === 0 ? 'bg-blue-500' : ''} border-bg-500`}></div>
                    <div>upload</div>
                </div>
                <div className='content flex flex-col items-center'>
                    <div className={`uploadStatus rounded-full w-3 h-3 ${nowState === 1 ? 'bg-blue-500' : ''} border-bg-500`}></div>
                    <div>Convert</div>
                </div>
                <div className='content flex flex-col items-center'>
                    <div className={`uploadStatus rounded-full w-3 h-3 ${nowState === 2 ? 'bg-blue-500' : ''} border-bg-500`}></div>
                    <div>Share</div>
                </div>
            </div>
            <button className='bg-red-500' onClick={handleState}>상태 바꾸기 / 테스트</button>
        </div>
    )
}

export default FileStatusbar
