import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginLayout from './layout/LoginLayout';
import MainLayout from './layout/MainLayout';

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