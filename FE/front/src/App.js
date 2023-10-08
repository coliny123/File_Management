import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginLayout from './layout/LoginLayout';
import MainLayout from './layout/MainLayout';
import LoginRedirectPage from './pages/LoginRedirectPage';
import NaverLoginRedirectPage from './pages/NaverRedirectPage';

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
            <Route path='/auth/google/callback' element={<LoginRedirectPage/>}></Route>
            <Route path='/auth/naver/callback' element={<NaverLoginRedirectPage/>}></Route>
            {/* <Route path='/auth/google/callback' element={<LoginRedirectPage/>}></Route> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;