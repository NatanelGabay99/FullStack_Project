import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import axiosInstance from "../../utils/axiosInstance";
import loginValidation from "../../validation/loginInputValidation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = loginValidation({ email, password });
    if (error) {
      setError(error.details[0].message);
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again later");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-ui-box right-10 -top-40"></div>
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2"></div>
      <div className="decorative-box box-right"></div>
      <div className="decorative-box box-center"></div>

      <div className="login-container">
       
        <div className="login-left-section z-10">
          <div>
            <h4 className="login-heading">
              Capture Your <br /> Trips
            </h4>
            <p className="login-description">
              Record your travel experiences and memories in your personal
              travel journal.
            </p>
          </div>
        </div>

        
        <div className="login-right-section z-10">
          <form onSubmit={handleLogin}>
            <h4 className="form-heading">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <PasswordInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="btn-primary">
              Submit
            </button>

            <p className="divider-text">Or</p>

            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </form>
          <div className="return-home">
            <p className="return-home-text" onClick={() => navigate("/home")}>
            Return to &apos;Home&apos; page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
