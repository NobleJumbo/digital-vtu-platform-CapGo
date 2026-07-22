

import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      
    <nav className="nav-container ">

      <h1 className="nav-container">
        
          <Link to="/">CapGo</Link>
      </h1>

      <div className="nav-links">
      
        <Link className="link-item" to="/">Data</Link>
        <Link className="link-item" to="/">Airtime</Link>
        <Link className="link-item" to="/">WAEC/NECO Card</Link>
        <Link className="link-item" to="/">payBills</Link>
        <Link className="link-item"  to="/">Blog</Link>

      </div>
         {/* signup  */}
         
      <div className="signup">  
       <Link className="signup-log" to="/login">Login</Link>
      <Link className="signup-reg" to="/register">Register</Link>
      </div>
    
    </nav>
      {/* HERO SECTION */}
      <section className="hero-section">

        {/* LEFT */}
        <div className="hero-left">

          <h1>
            What do you want to <br />
            buy today?
          </h1>  
          <h2>
             Buy Cheap Data, Airtime & Pay Bills Instantly
           </h2>
<p className="hero-text">
  Enjoy super-fast data subscriptions, airtime recharge,
  cable TV payments, electricity bills and more —
  all in one secure platform.
</p>

          <Link className="hero-btn" to="/register">
            Start Buying Now
          </Link>

        </div>

        {/* RIGHT */}
        <div className="hero-right">

          <div className="card-grid">

            <div className="service-card">⚡ Instant Airtime</div>
            <div className="service-card">📶 Cheap Data Plans</div>
            <div className="service-card">
💡 Electricity Bills
</div>
            <div className="service-card">
📺 Cable TV Payments
</div>
            <div className="service-card">
🎓 WAEC & NECO Pins
</div>
            <div className="service-card">
💳 Wallet Funding</div>

          </div>

        </div>

      </section>

      {/* VTU BUSINESS SECTION */}
      <section className="business-section">

        <div className="business-left">

          <h2>
            Bill payment made easy  
          </h2>

          <div className="laptop-box">
            VTU Dashboard Preview
          </div>

        </div>

        <div className="business-right">

          <p className="small-title">
            START YOUR OWN VTU BUSINESS - NOW!
          </p>

          <h1>
            Get a Fully-Functional VTU Website
            Built & Delivered to You INSTANTLY
          </h1>

          <div className="steps">

            <div className="step">
              <span>1</span>
              <p>Register & Login</p>
            </div>

            <div className="step">
              <span>2</span>
              <p>Click on Become a Vendor</p>
            </div>

            <div className="step">
              <span>3</span>
              <p>Submit your details</p>
            </div>

          </div>

        </div>

      </section>

      {/* SERVICES */}
      <section className="services-section">

        <h1>Our Services</h1>

        <div className="services-grid">

          <div className="service-item">Buy Data</div>
          <div className="service-item">Buy Airtime</div>
          <div className="service-item">Pay Bills</div>
          <div className="service-item">Bulk SMS</div>
          <div className="service-item">Recharge Card</div>
          <div className="service-item">WAEC/NECO</div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
      CapGo VTU © 2026 — Fast, Reliable & Affordable Digital Services.
      </footer>
    </>
  );
}

export default Navbar;