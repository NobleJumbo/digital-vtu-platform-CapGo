import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN FROM STORAGE:", token);
      console.log(
        "PROFILE URL:",
        import.meta.env.VITE_API_URL_PROFILE
      );
      console.log(
        "WALLET URL:",
        import.meta.env.VITE_API_URL_WALLET
      );

      if (!token) {
        console.log("No token found");
        setLoading(false);
        return;
      }

      const profileRes = await axios.get(
        import.meta.env.VITE_API_URL_PROFILE,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "PROFILE RESPONSE:",
        profileRes.data
      );

      const walletRes = await axios.get(
        import.meta.env.VITE_API_URL_WALLET,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "WALLET RESPONSE:",
        walletRes.data
      );

      setUser(profileRes.data.user);
      setWallet(walletRes.data.wallet);
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);
  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Wallet Card */}
      <div className="balance-card">
        <p>
          Hello, {user?.name || "User"}
        </p>

        <h1>
          ₦
          {wallet?.balance? wallet.balance.toLocaleString(): "0"}
        </h1>

        <div className="balance-actions">
          <button>Deposit</button>
          <button>Transfer</button>
        </div>
      </div>

      {/* Quick Actions */}
      <section>
        <h3>Quick Actions</h3>

        <div className="quick-grid">
          <div className="item">
            <span>📱</span>
            <p>Airtime</p>
          </div>

          <div className="item">
            <span>📶</span>
            <p>Data</p>
          </div>

          <div className="item">
            <span>📺</span>
            <p>Cable TV</p>
          </div>

          <div className="item">
            <span>⚡</span>
            <p>Electricity</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <h3>Services</h3>

        <div className="services-grid">
          <div className="service-card">
            Airtime Purchase
          </div>

          <div className="service-card">
            Data Subscription
          </div>

          <div className="service-card">
            Cable TV
          </div>

          <div className="service-card">
            Electricity Bills
          </div>
        </div>
      </section>

      {/* User Info */}
      <section>
        <h3>Account Information</h3>

        <div className="service-card">
          <p>
            <strong>Name:</strong>{" "}
            {user?.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {user?.phone}
          </p>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <span>🏠</span>
        <span>💳</span>
        <span>📄</span>
        <span>👤</span>
      </div>
    </div>
  );
}

export default Dashboard;