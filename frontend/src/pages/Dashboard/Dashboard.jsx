
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const profileRes = await axios.get(
          import.meta.env.VITE_API_URL_PROFILE,
          { headers }
        );

        const walletRes = await axios.get(
          import.meta.env.VITE_API_URL_WALLET,
          { headers }
        );

        const transactionRes = await axios.get(
          import.meta.env.VITE_API_URL_TRANSFER,
          { headers }
        );

        setUser(profileRes.data.user);
        setWallet(walletRes.data.wallet);

        setTransactions(
          transactionRes.data.transactions || []
        );
      } catch (error) {
        console.error(
          error.response?.data || error.message
        );

        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard5">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <button
          className="menu-btn"
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >
          ☰
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* ACCOUNT PANEL */}
      {showMenu && (
        <div className="account-panel">
          <h3>Account Information</h3>

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
      )}

      {/* BALANCE CARD */}
      <div className="balance-card">
        <p>
          Hello, {user?.name || "User"} 👋
        </p>

        <h1>
          ₦
          {wallet?.balance
            ? wallet.balance.toLocaleString()
            : "0"}
        </h1>

        <div className="balance-actions">
          <button>Deposit</button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
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

      {/* SERVICES */}
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

      {/* TRANSACTIONS */}
{/* RECENT TRANSACTIONS */}
<section>
  <h3>Recent Transactions</h3>

  <div className="transactions-list">
    {transactions && transactions.length > 0 ? (
      transactions.map((trx) => (
        <div
          key={trx._id}
          className="transaction-card"
        >
          <div className="transaction-top">
            <h4>
              {trx.description ||
                trx.type ||
                "Transaction"}
            </h4>

            <span
              className={`status ${trx.status?.toLowerCase()}`}
            >
              {trx.status}
            </span>
          </div>

          <p>
            Amount: ₦
            {Number(
              trx.amount || 0
            ).toLocaleString()}
          </p>

          <p>
            Ref:{" "}
            {trx.reference ||
              trx.ref ||
              "N/A"}
          </p>

          <p>
            Date:{" "}
            {new Date(
              trx.createdAt
            ).toLocaleString()}
          </p>
        </div>
      ))
    ) : (
      <div className="service-card">
        No transactions found
      </div>
    )}
  </div>
</section>
      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <span>🏠</span>
        <span>💳</span>
        <span>⚡</span>
        <span>👤</span>
      </div>

    </div>
  );
}

export default Dashboard;