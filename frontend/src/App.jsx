import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/DashBoard';
import Round from './components/Round';
import Leaderboard from './components/LeaderBoard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/round1" element={<Round/>} />
        {/* <Route path="round2" element={<CodingPlatform />} /> */}
        <Route path="/leader" element={<Leaderboard/>} />
      </Routes>
      <ToastContainer />
    </Router>
    
  );
}

export default App;



