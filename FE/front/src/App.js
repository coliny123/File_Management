import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import Navbar from './components/bar/Navbar';
import Sidebar from './components/bar/Sidebar';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

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

const LoginLayout = () => {
  return(<>A</>)
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path='/' element={<LandingPage/>}/>
          </Route>
          <Route element={<LoginLayout/>}>
            <Route path='/login' element={<LoginPage/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;