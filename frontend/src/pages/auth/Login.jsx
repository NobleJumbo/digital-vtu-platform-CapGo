import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import {
  FaGoogle,
  FaApple,
  FaFacebook,
} from "react-icons/fa";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const identifier = form.identifier.value.trim();
    const password = form.password.value;

    if (!identifier || !password) {
      return alert("Please fill in all fields");
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL_LOGIN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return alert(data.message || "Login failed");
      }

      console.log("Login successful:", data);

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Logo */}
        <div className="logo-section">
          <div className="logo-box">⚡</div>

          <h1 className="logo-title">CapGo</h1>

          <p className="logo-subtitle">PLATFORM</p>
        </div>

        {/* Heading */}
        <div className="heading-section">
          <h2>Welcome Back!</h2>
          <p>Login to your account to continue</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>

          {/* Email / Phone */}
          <div className="input-box">
            <FiUser className="input-icon" />

            <div className="input-content">
              <label>Email or Phone Number</label>

              <input
                type="text"
                name="identifier"
                placeholder="Enter your email or phone number"
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-box password-box">
            <div className="password-left">
              <FiLock className="input-icon" />

              <div className="input-content">
                <label>Password</label>

                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {passwordVisible ? (
              <FiEyeOff
                className="eye-icon"
                onClick={togglePassword}
              />
            ) : (
              <FiEye
                className="eye-icon"
                onClick={togglePassword}
              />
            )}
          </div>

          {/* Options */}
          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>

            <p className="forgot-password">
              Forgot Password?
            </p>
          </div>

          {/* Button */}
          <button className="login-btn" type="submit">
            Login <FiArrowRight className="arrow-icon" />
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <div className="line"></div>
          <p>or continue with</p>
          <div className="line"></div>
        </div>

        {/* Social */}
        <div className="social-login">
          <div className="social-box"><FaGoogle /></div>
          <div className="social-box"><FaApple /></div>
          <div className="social-box"><FaFacebook /></div>
        </div>

        {/* Footer */}
        <div className="footer-text">
          <p>
            Don’t have an account?
            <span>
              <a href="/register"> Register here</a>
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;