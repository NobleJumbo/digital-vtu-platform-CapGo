import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  FiUser,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

// import {
//   FaGoogle,
//   FaApple,
//   FaFacebook,
// } from "react-icons/fa";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      return alert("Please fill in all fields");
    }

    try {
      setLoading(true);

      const response = await fetch(
        import.meta.env.VITE_API_URL_LOGIN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
  email: identifier,
  phone: identifier,
  password,
})
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return alert(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
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

          {/* Email */}
          <div className="input-box">
            <FiUser className="input-icon" />

            <div className="input-content">
              <label>Email or number</label>

              <input
                type="text"
                placeholder="Enter your email or phone number"
                value={identifier}
                onChange={(e) =>
                  setIdentifier(e.target.value)
                }
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
                  type={
                    passwordVisible
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
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
          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}

            {!loading && (
              <FiArrowRight className="arrow-icon" />
            )}
          </button>

        </form>

        {/* Divider */}
        {/* <div className="divider">

          <div className="line"></div>

          <p>or continue with</p>

          <div className="line"></div>

        </div> */}

        {/* Social Login */}
        {/* <div className="social-login">

          <div className="social-box">
            <FaGoogle />
          </div>

          <div className="social-box">
            <FaApple />
          </div>

          <div className="social-box">
            <FaFacebook />
          </div>

        </div> */}

        {/* Footer */}
        <div className="footer-text">

          <p>
            Don’t have an account?

            <span>
              <Link to="/register">
                Register here
              </Link>
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;