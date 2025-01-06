import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Home/Dashboard";
import Login from "./pages/Auth/Login";
import AboutPage from "./pages/About/AboutPage";
import HomePage from "./pages/Home/HomePage";
import FavoritesPage from "./pages/Favorite/FavoritesPage";
import SignUp from "./pages/Auth/SignUp";

const App = () => {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
      </Router>
    </div>
  );
};

export default App;
