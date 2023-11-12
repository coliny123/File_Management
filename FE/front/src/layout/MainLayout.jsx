import Bottombar from '../components/bar/Bottombar';
import Navbar from '../components/bar/Navbar';
import Sidebar from '../components/bar/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <div className='max-md:invisible'>
                <Sidebar></Sidebar>
            </div>
            <div className='md:invisible'>
                <Bottombar></Bottombar>
            </div>
            <div className='h-screen'>
                <Navbar></Navbar>
                <div className='page-area bg-[#F7F6FB] relative min-h-screen'>
                <div className='w-full h-10 ml-[80px] fixed left-0 top-[80px] z-[200] bg-white max-md:invisible'></div>
                <div className='w-full h-10 ml-[80px] fixed left-0 top-[80px] z-[300] bg-[#F7F6FB] rounded-tl-[30px] max-md:invisible'></div>
                    <div className='pt-[120px] max-md:pb-[100px]'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout