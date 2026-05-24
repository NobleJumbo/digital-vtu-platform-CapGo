import {
  FiUser,
  FiLock,
  FiArrowRight,
  FiEye,
} from "react-icons/fi";

import {
  FaGoogle,
  FaApple,
  FaFacebook,
} from "react-icons/fa";

import "./Login.css";

function Login() {
  return (
    <div className="login-page">

      {/* Container */}
      <div className="login-container">

        {/* Logo */}
        <div className="logo-section">

          <div className="logo-box">
            ⚡
          </div>

          <h1 className="logo-title">
            VTU
          </h1>

          <p className="logo-subtitle">
            PLATFORM
          </p>

        </div>

        {/* Heading */}
        <div className="heading-section">

          <h2>
            Welcome Back!
          </h2>

          <p>
            Login to your account to continue
          </p>

        </div>

        {/* Form */}
        <form className="login-form">

          {/* Email */}
          <div className="input-box">

            <FiUser className="input-icon" />

            <div className="input-content">

              <label>Email or Phone Number</label>

              <input
                type="text"
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
                  type="password"
                  placeholder="Enter your password"
                />

              </div>

            </div>

            <FiEye className="eye-icon" />

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
          <button className="login-btn">

            Login

            <FiArrowRight className="arrow-icon" />

          </button>

        </form>

        {/* Divider */}
        <div className="divider">

          <div className="line"></div>

          <p>or continue with</p>

          <div className="line"></div>

        </div>

        {/* Social Login */}
        <div className="social-login">

          <div className="social-box">
            <FaGoogle />
          </div>

          <div className="social-box">
            <FaApple />
          </div>

          <div className="social-box">
            <FaFacebook />
          </div>

        </div>

        {/* Footer */}
        <div className="footer-text">

          <p>
            Don’t have an account?

            <span>
              Create one
            </span>

          </p>

        </div>

      </div>


    </div>
  );

}

export default Login;