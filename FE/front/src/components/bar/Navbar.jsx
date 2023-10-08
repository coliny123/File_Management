import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate();

    return (
        <div className='w-full h-12 bg-white'>
            <ul className='h-full flex space-x-10 justify-end mr-10 items-center'>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <button onClick={() => navigate("/login")}>로그인</button>
                {/* <button onClick={() => window.location.href("/login")}>로그인</button> */}
                <div className="mt-4">
                </div>
            </ul>
        </div>
    )
}

export default Navbar
