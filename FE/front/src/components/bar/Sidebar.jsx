import React from 'react'


function Sidebar() {
    return (
        <div className='fixed left-0 top-0 h-full w-24 flex flex-column bg-white'>
            <div className='title'>
                title
            </div>
            <div className='menu'>
                <ul>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar