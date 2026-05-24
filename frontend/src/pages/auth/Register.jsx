import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiGift,
  FiArrowRight,
  FiEye,
} from "react-icons/fi";

function Register() {
  return (
    <div className="register-page">

      {/* Container */}
      <div className="register-container">

        {/* Logo */}
        <div className="logo-section">
          <div className="logo-box">⚡</div>
          <h1 className="logo-title">CapGo</h1>
          <p className="logo-subtitle"> PLATFORM</p>
        </div>

        {/* Heading */}
        <div className="heading-section">
          <h2>Create Account</h2>
          <p>Join thousands of users enjoying seamless
            airtime, data and bill payments.</p>
        </div>

        {/* Form */}
        <form className="register-form">

          {/* Full Name */}
          <div className="input-box">

            <FiUser className="input-icon" />

            <div className="input-content">

              <label>Full Name</label>

              <input
                type="text"
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
                placeholder="Enter your phone number"
              />

            </div>

          </div>

          {/* Password */}
          <div className="input-box password-box">

            <div className="password-left">
              <FiLock className="input-icon"  />
              <div className="input-content">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create a strong password"/>
              </div>
            </div>

            <FiEye className="eye-icon" onClick={"passIcon"}/>

          </div>

          {/* Confirm Password */}
          <div className="input-box password-box">
            <div className="password-left">
              <FiLock className="input-icon" />
              <div className="input-content">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <FiEye className="eye-icon" />
          </div>

          {/* Referral */}
          <div className="input-box">

            <FiGift className="input-icon" />

            <div className="input-content">

              <label>Referral Code (Optional)</label>

              <input
                type="text"
                placeholder="Enter referral code if you have one"
              />

            </div>

          </div>

          {/* Button */}
          <button className="register-btn">
            Create Account
            <FiArrowRight className="arrow-icon" />
          </button>
        </form>

        {/* Footer */}
        <div className="footer-text">

          <p>
            Already have an account?

            <span>
            
              Login
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;