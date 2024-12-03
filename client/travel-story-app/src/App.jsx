import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Root from './routes/Root';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;