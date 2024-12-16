import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Auth/Signup";
import Dashboard from "./pages/Home/Dashboard";
import Login from "./pages/Auth/Login";
import Root from "./routes/Root";
import AboutPage from "./pages/About/AboutPage";
import HomePage from "./pages/Home/HomePage";
import { ThemeProvider } from "./providers/ThemeProvider";
import LightDarkThemeMode from "./themes/LightDarkThemeMode";

const App = () => {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
      </Router>
    </div>
  );
};

export default App;
