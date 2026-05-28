"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiGift,
  FiArrowRight,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function Register() {
  const navigate = useNavigate();

  // Password visibility states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState(false);

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };
 const isValidPHONE = (phone) => {
    // const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
  };
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const referralCode = form.referralCode.value.trim();

    // Validation
    if (!name || !email || !phone || !password) {
      return alert("Please fill in all required fields");
    }

    if (!isValidEmail(email)) {
      return alert("Please enter a valid email address");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters long");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
      if (!isValidPHONE(phone)) {
      return alert("Please enter a valid phone number");
      }
    
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL_REGISTER,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            referralCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return alert(data.message || "Registration failed");
      }
      console.log("Registration successful:", data);

      alert("Registration successful!");

      // Redirect to login page
      navigate("./login");

    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="register-page">

      {/* Container */}
      <div className="register-container">

        {/* Logo */}
        <div className="logo-section">
          <div className="logo-box">⚡</div>

          <h1 className="logo-title">CapGo</h1>

          <p className="logo-subtitle">PLATFORM</p>
        </div>

        {/* Heading */}
        <div className="heading-section">
          <h2>Create Account</h2>

          <p>
            Join thousands of users enjoying seamless airtime,
            data and bill payments.
          </p>
        </div>

        {/* Form */}
        <form className="register-form" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="input-box">
            <FiUser className="input-icon" />

            <div className="input-content">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-box">
            <FiMail className="input-icon" />

            <div className="input-content">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="input-box">
            <FiPhone className="input-icon" />

            <div className="input-content">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
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
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            {passwordVisible ? (
              <FiEyeOff
                className="eye-icon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FiEye
                className="eye-icon"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="input-box password-box">
            <div className="password-left">
              <FiLock className="input-icon" />

              <div className="input-content">
                <label>Confirm Password</label>

                <input
                  type={
                    confirmPasswordVisible
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {confirmPasswordVisible ? (
              <FiEyeOff
                className="eye-icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <FiEye
                className="eye-icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            )}
          </div>

          {/* Referral */}
          <div className="input-box">
            <FiGift className="input-icon" />

            <div className="input-content">
              <label>Referral Code (Optional)</label>

              <input
                type="text"
                name="referralCode"
                placeholder="Enter referral code if you have one"
              />
            </div>
          </div>

          {/* Button */}
          <button type="submit" className="register-btn">
            Create Account

            <FiArrowRight className="arrow-icon" />
          </button>
        </form>

        {/* Footer */}
        <div className="footer-text">
          <p>
            Already have an account?

            <span>
              <a href="./login"> Login here</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;