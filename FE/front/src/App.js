import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import Navbar from './components/bar/Navbar';
import Sidebar from './components/bar/Sidebar';

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

export default App;