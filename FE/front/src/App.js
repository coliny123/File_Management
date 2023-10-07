import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import Navbar from './components/bar/Navbar';
import Sidebar from './components/bar/Sidebar';
import { Routes, Route, Router } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Sidebar></Sidebar>
          <div className='ml-56 h-screen'>
            <Navbar></Navbar>
            <div className='page-area rounded-tl-3xl p-10 bg-[#F7F6FB] h-full'>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
            </div>
          </div>
        </Routes>
      </Router>
    </div>
  );
}

export default App;