import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/Auth/Signup';
import Login from './pages/Auth/Login';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App