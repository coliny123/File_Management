import Navbar from '../components/bar/Navbar';
import Sidebar from '../components/bar/Sidebar';
import { Outlet } from 'react-router-dom';

// const UpperLeftBlock = () => {

//     return (
//         <div className='w-48 h-48 bg-white -z-50'>
//             <div className=' relative left-24 top-24 w-36 h-36 rounded-full bg-black'></div>
//         </div>
//     )
// }

const MainLayout = () => {
    return (
        <> 
            <Sidebar></Sidebar>
            <div className='h-screen'>
                <Navbar></Navbar>
                <div className='page-area rounded-tl-3xl p-10 bg-[#F7F6FB] h-full'>
                    {/* <UpperLeftBlock></UpperLeftBlock> */}
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}

export default MainLayout