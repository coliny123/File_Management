// import React from 'react'

// const SidebarWrapper = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 250px;
//   height: 100%;
//   background-color: #333;
//   color: white;
//   transition: transform 0.3s ease; /* transform 속성에 애니메이션 효과 추가 */
//   transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-250px)'};
// `;

// const Togglebar = styled.div`
//   display: flex;
//   flex-direction: column;
// `;


// function Togglebar({ isTogglebarOpen }) {

//     return (
//         <div className={`flex flex-col ${isTogglebarOpen ? 'toggle-open' : ''}`}>
//             <div>토글</div>
//             <div>토글</div>
//             <div>토글</div>
//         </div>
//     )
// }

// function Sidebar() {

//     const [isTogglebarOpen, setIsTogglebarOpen] = useState(false);

//     const handleOpenTogglebar = () => {
//         setIsTogglebarOpen(!isTogglebarOpen);
//     }

//     return (
//         <>
//             <div className='fixed left-0 top-0 h-full w-24 flex flex-column bg-white'>
//                 <div className='title'>
//                     title
//                 </div>
//                 <div className='menu'>
//                     <ul>
//                         <button onClick={handleOpenTogglebar}></button>
//                         <li>A</li>
//                         <li>B</li>
//                         <li>C</li>
//                         <li>D</li>
//                     </ul>
//                 </div>
//             </div>
//             <div>

//             </div>
//         </>
//     )
// }

// export default Sidebar


import React, { useState } from 'react';

function Sidebar() {
    const [isTogglebarOpen, setIsTogglebarOpen] = useState(false);

    const handleOpenTogglebar = () => {
        setIsTogglebarOpen((pre) => !pre);
        console.log(isTogglebarOpen)
    };

    return (
        <>
            <div className={`fixed left-0 top-0 h-full w-24 flex flex-col bg-white z-50`}>
                <div className='title'>title</div>
                <div className='menu mt-20'>
                    <ul>
                        <button onClick={handleOpenTogglebar}>Toggle</button>
                        <li>A</li>
                        <li>B</li>
                        <li>C</li>
                        <li>D</li>
                    </ul>
                </div>
            </div>
            <div className={`z-20 fixed left-24 top-0 flex-col w-24 bg-green-500 h-full transition-transform ease-in-out duration-300 transform ${isTogglebarOpen ? '' : '-translate-x-full'}`}>
                <div>토글</div>
                <div>토글</div>
                <div>토글</div>
            </div>
        </>
    );
}

export default Sidebar;
