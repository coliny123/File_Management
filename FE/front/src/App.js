import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import Navbar from './components/bar/Navbar';
import Sidebar from './components/bar/Sidebar';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
        <Sidebar></Sidebar>
          <div className='ml-56 h-screen'>
            <Navbar></Navbar>
            <div className='page-area rounded-tl-3xl p-10 bg-[#F7F6FB] h-full'>
                <LandingPage></LandingPage>
            </div>
          </div>
    </div>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Sidebar></Sidebar>
//           <div className='ml-56 h-screen'>
//             <Navbar></Navbar>
//             <div className='page-area rounded-tl-3xl p-10 bg-[#F7F6FB] h-full'>
//               <Routes>
//                 <Route path="/" element={<LandingPage />}></Route>
//                 <Route path="/login" element={<LoginPage />}></Route>
//               </Routes>
//             </div>
//           </div>
//       </Router>
//     </div>
//   );
// }

export default App;