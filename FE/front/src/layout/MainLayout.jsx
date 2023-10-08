import Navbar from '../components/bar/Navbar';
import Sidebar from '../components/bar/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <> 
            <Sidebar></Sidebar>
            <div className='ml-24 h-screen'>
                <Navbar></Navbar>
                <div className='page-area rounded-tl-3xl p-10 bg-[#F7F6FB] h-full'>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}

export default MainLayout