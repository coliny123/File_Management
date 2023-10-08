import Navbar from '../components/bar/Navbar';
import Sidebar from '../components/bar/Sidebar';

const MainLayout = () => {
    return (
        <>
            <Sidebar></Sidebar>
            <div className='ml-56 h-screen'>
                <Navbar></Navbar>
                <div className='page-area rounded-tl-3xl p-10 bg-[#F7F6FB] h-full'>
                </div>
            </div>
        </>
    )
}

export default MainLayout