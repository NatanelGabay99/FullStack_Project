import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import registerValidation from "../../validation/registerInputValidation";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = registerValidation({ fullName: name, email, password });
    console.log(error);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
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
    <div className="signup-page">
      <div className="login-ui-box right-10 -top-40"></div>
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2"></div>
      <div className="decorative-box box-right"></div>
      <div className="decorative-box box-center"></div>

      <div className="signup-container">
      
        <div className="signup-left-section z-10">
          <div>
            <h4 className="signup-heading">
              Join the <br /> Adventure
            </h4>
            <p className="signup-description">
              Create an account to start documenting your travel destinations
              and preserving your memories in your personal travel journal.
            </p>
          </div>
        </div>

       
        <div className="signup-right-section z-10">
          <form onSubmit={handleSignUp}>
            <h4 className="form-heading">Signup</h4>

            <input
              type="text"
              placeholder="Full Name"
              className="input-box"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
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
              onClick={() => navigate("/login")}
            >
              Login
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

export default SignUp;
