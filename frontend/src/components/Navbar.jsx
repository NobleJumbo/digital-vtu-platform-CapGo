import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="capgo-page">

      {/* ================= NAVBAR ================= */}
      <header className="nav-container">
        <div className="navbar-inner">

          {/* LOGO */}
          <Link to="/" className="logo">
            <span className="logo-mark">C</span>
            <span className="logo-text">CapGo</span>
          </Link>

          {/* NAVIGATION */}
          <nav className="nav-links">

            <Link to="/data" className="nav-link">
              Data
            </Link>

            <Link to="/airtime" className="nav-link">
              Airtime
            </Link>

            <Link to="/education" className="nav-link">
              WAEC / NECO
            </Link>

            <Link to="/bills" className="nav-link">
              Pay Bills
            </Link>

            <Link to="/blog" className="nav-link">
              Blog
            </Link>

          </nav>

          {/* AUTH BUTTONS */}
          <div className="signup">
            <Link to="/login" className="signup-log">
              Login
            </Link>

            <Link to="/register" className="signup-reg">
              Get Started
            </Link>
          </div>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <main>

        <section className="hero-section">

          <div className="hero-container">

            {/* LEFT */}
            <div className="hero-content">

              <div className="hero-badge">
                ⚡ Fast. Simple. Reliable.
              </div>

              <h1>
                Everything you need,
                <span> right at your fingertips.</span>
              </h1>

              <p className="hero-description">
                Buy data, recharge airtime, pay electricity bills,
                renew your cable subscription and purchase educational
                pins — all from one simple and secure platform.
              </p>

              <div className="hero-actions">

                <Link
                  to="/register"
                  className="primary-btn"
                >
                  Get Started
                  <span>→</span>
                </Link>

                <Link
                  to="/login"
                  className="secondary-btn"
                >
                  Login to CapGo
                </Link>

              </div>

              <div className="hero-trust">

                <div className="trust-item">
                  <strong>⚡</strong>
                  <span>Fast Transactions</span>
                </div>

                <div className="trust-item">
                  <strong>🔒</strong>
                  <span>Secure Payments</span>
                </div>

                <div className="trust-item">
                  <strong>24/7</strong>
                  <span>Available Anytime</span>
                </div>

              </div>

            </div>


            {/* RIGHT */}
            <div className="hero-visual">

              <div className="dashboard-card">

                <div className="dashboard-header">
                  <div>
                    <small>CapGo Services</small>
                    <h3>What do you need today?</h3>
                  </div>

                  <div className="dashboard-icon">
                    ⚡
                  </div>
                </div>


                <div className="service-grid">

                  <Link to="/data" className="service-card data-card">
                    <div className="service-icon">
                      📶
                    </div>

                    <div>
                      <h4>Buy Data</h4>
                      <p>Affordable data plans</p>
                    </div>

                    <span>→</span>
                  </Link>


                  <Link to="/airtime" className="service-card airtime-card">
                    <div className="service-icon">
                      📱
                    </div>

                    <div>
                      <h4>Airtime</h4>
                      <p>Recharge any network</p>
                    </div>

                    <span>→</span>
                  </Link>


                  <Link to="/bills" className="service-card electricity-card">
                    <div className="service-icon">
                      💡
                    </div>

                    <div>
                      <h4>Electricity</h4>
                      <p>Pay your electricity bills</p>
                    </div>

                    <span>→</span>
                  </Link>


                  <Link to="/cable" className="service-card cable-card">
                    <div className="service-icon">
                      📺
                    </div>

                    <div>
                      <h4>Cable TV</h4>
                      <p>Renew your subscription</p>
                    </div>

                    <span>→</span>
                  </Link>


                  <Link
                    to="/education"
                    className="service-card education-card"
                  >
                    <div className="service-icon">
                      🎓
                    </div>

                    <div>
                      <h4>WAEC / NECO</h4>
                      <p>Purchase exam pins</p>
                    </div>

                    <span>→</span>
                  </Link>


                  <Link
                    to="/services"
                    className="service-card more-card"
                  >
                    <div className="service-icon">
                      ⚙️
                    </div>

                    <div>
                      <h4>More Services</h4>
                      <p>Explore CapGo</p>
                    </div>

                    <span>→</span>
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= PAYMENT SECTION ================= */}
        <section className="payment-section">

          <div className="payment-container">

            <div className="payment-content">

              <span className="section-label">
                SIMPLE PAYMENTS
              </span>

              <h2>
                Pay for your services
                <span> your way.</span>
              </h2>

              <p>
                No complicated process. Select the service you need,
                enter your details and complete your payment securely
                using the available payment options.
              </p>

              <div className="payment-features">

                <div className="payment-feature">
                  <span>✓</span>
                  <div>
                    <strong>Pay by Card</strong>
                    <p>
                      Use your debit or credit card securely.
                    </p>
                  </div>
                </div>

                <div className="payment-feature">
                  <span>✓</span>
                  <div>
                    <strong>Pay by Bank Transfer</strong>
                    <p>
                      Make a direct bank transfer to complete your order.
                    </p>
                  </div>
                </div>

                <div className="payment-feature">
                  <span>✓</span>
                  <div>
                    <strong>Instant Confirmation</strong>
                    <p>
                      Get confirmation once your payment is successful.
                    </p>
                  </div>
                </div>

              </div>

            </div>


            <div className="payment-card">

              <div className="payment-card-top">
                <span>CapGo</span>
                <span className="secure-badge">
                  🔒 Secure
                </span>
              </div>

              <div className="payment-amount">
                <small>Service Payment</small>
                <h3>₦1,000.00</h3>
              </div>

              <div className="payment-method">
                <div className="method-icon">
                  💳
                </div>

                <div>
                  <strong>Card or Bank Transfer</strong>
                  <p>
                    Choose your preferred payment method
                  </p>
                </div>

                <span>→</span>
              </div>

              <div className="payment-success">
                <span>✓</span>
                Payment secured
              </div>

            </div>

          </div>

        </section>


        {/* ================= SERVICES ================= */}
        <section className="services-section">

          <div className="section-heading">

            <span className="section-label">
              OUR SERVICES
            </span>

            <h2>
              Everything you need in one place
            </h2>

            <p>
              CapGo makes everyday digital payments quick,
              convenient and accessible.
            </p>

          </div>


          <div className="services-grid">

            <Link to="/data" className="service-item">
              <div className="large-service-icon">
                📶
              </div>

              <h3>Data Plans</h3>

              <p>
                Get affordable data bundles from your
                preferred network.
              </p>

              <span>Buy Data →</span>
            </Link>


            <Link to="/airtime" className="service-item">
              <div className="large-service-icon">
                📱
              </div>

              <h3>Airtime</h3>

              <p>
                Recharge your phone or send airtime
                to someone instantly.
              </p>

              <span>Buy Airtime →</span>
            </Link>


            <Link to="/bills" className="service-item">
              <div className="large-service-icon">
                💡
              </div>

              <h3>Electricity</h3>

              <p>
                Pay your electricity bills without
                visiting a physical office.
              </p>

              <span>Pay Bill →</span>
            </Link>


            <Link to="/cable" className="service-item">
              <div className="large-service-icon">
                📺
              </div>

              <h3>Cable TV</h3>

              <p>
                Renew your TV subscription quickly
                and conveniently.
              </p>

              <span>Pay TV →</span>
            </Link>


            <Link to="/education" className="service-item">
              <div className="large-service-icon">
                🎓
              </div>

              <h3>WAEC & NECO</h3>

              <p>
                Purchase examination pins whenever
                you need them.
              </p>

              <span>Get Pin →</span>
            </Link>


            <Link to="/services" className="service-item">
              <div className="large-service-icon">
                ⚙️
              </div>

              <h3>More Services</h3>

              <p>
                Discover more digital services available
                on CapGo.
              </p>

              <span>Explore →</span>
            </Link>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="cta-section">

          <div className="cta-container">

            <div>
              <span className="section-label">
                READY TO GET STARTED?
              </span>

              <h2>
                Your everyday digital services,
                made easier.
              </h2>

              <p>
                Create your CapGo account and enjoy a
                faster and more convenient way to pay
                for digital services.
              </p>
            </div>

            <Link
              to="/register"
              className="cta-button"
            >
              Create Your Account →
            </Link>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <Link to="/" className="logo footer-logo">
              <span className="logo-mark">C</span>
              <span className="logo-text">CapGo</span>
            </Link>

            <p>
              Fast, simple and reliable digital services
              for everyday life.
            </p>

          </div>


          <div className="footer-column">

            <h4>Services</h4>

            <Link to="/data">Data</Link>
            <Link to="/airtime">Airtime</Link>
            <Link to="/bills">Electricity</Link>
            <Link to="/cable">Cable TV</Link>

          </div>


          <div className="footer-column">

            <h4>Company</h4>

            <Link to="/about">About Us</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>

          </div>


          <div className="footer-column">

            <h4>Account</h4>

            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/transactions">
              Transactions
            </Link>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 CapGo Digital Services. All rights reserved.
          </p>

          <div>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>

        </div>

      </footer>

    </div>
  );
}

export default Navbar;