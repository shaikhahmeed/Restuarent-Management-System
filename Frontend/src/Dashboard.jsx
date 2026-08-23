import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api/api";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFoods: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await API.get("/dashboard/stats");

        console.log(
          "Dashboard stats:",
          response.data
        );

        setStats(response.data);

      } catch (error) {
        console.error(
          "Failed to load dashboard stats:",
          error.response?.data
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentOrders = async () => {
      try {
        const response = await API.get(
          "/dashboard/recent-orders"
        );

        console.log(
          "Recent orders:",
          response.data
        );

        setRecentOrders(response.data);

      } catch (error) {
        console.error(
          "Failed to load recent orders:",
          error.response?.data
        );
      }
    };

    const fetchMonthlyRevenue = async () => {
      try {
        const response = await API.get(
          "/dashboard/monthly-revenue"
        );

        console.log(
          "Monthly revenue:",
          response.data
        );

        setMonthlyRevenue(response.data);

      } catch (error) {
        console.error(
          "Failed to load monthly revenue:",
          error.response?.data
        );
      }
    };

    fetchDashboardStats();
    fetchRecentOrders();
    fetchMonthlyRevenue();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2>🍽️ Restaurant</h2>

        <div className="sidebar-menu">

          <button>
            📊 Dashboard
          </button>

          <button onClick={() => navigate("/foods")}>
              🍔 Foods
            </button>

          <button onClick={() => navigate("/orders")}>
           📦 Orders
          </button>

          <button onClick={() => navigate("/users")}>
          👥 Users
          </button>

        </div>

      </aside>


      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="dashboard-header">

          <h1>
            Restaurant Management System
          </h1>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </header>


        {/* Dashboard Content */}
        <div className="dashboard-content">

          {/* Welcome */}
          <section className="welcome-section">

            <h2>
              Admin Dashboard
            </h2>

            <p>
              Welcome, <strong>{user?.name}</strong>
            </p>

            <p>
              Email: {user?.email}
            </p>

            <p>
              Role: {user?.role}
            </p>

          </section>


          {/* Statistics */}
          <section className="stats-grid">

            <div className="stat-card users-card">
              <h3>Total Users</h3>

              <p>
                {loading
                  ? "Loading..."
                  : stats.totalUsers}
              </p>
            </div>


            <div className="stat-card foods-card">
              <h3>Total Foods</h3>

              <p>
                {loading
                  ? "Loading..."
                  : stats.totalFoods}
              </p>
            </div>


            <div className="stat-card orders-card">
              <h3>Total Orders</h3>

              <p>
                {loading
                  ? "Loading..."
                  : stats.totalOrders}
              </p>
            </div>


            <div className="stat-card pending-card">
              <h3>Pending Orders</h3>

              <p>
                {loading
                  ? "Loading..."
                  : stats.pendingOrders}
              </p>
            </div>


            <div className="stat-card revenue-card">
              <h3>Total Revenue</h3>

              <p>
                {loading
                  ? "Loading..."
                  : `৳ ${stats.totalRevenue}`}
              </p>
            </div>

          </section>


          {/* Recent Orders */}
          <section className="dashboard-section">

            <h2>
              Recent Orders
            </h2>

            {recentOrders.length === 0 ? (
              <p>
                No recent orders found.
              </p>
            ) : (
              recentOrders.map((order) => (

                <div
                  className="order-card"
                  key={order._id}
                >

                  <p>
                    <strong>Order ID:</strong>{" "}
                    {order._id}
                  </p>

                  <p>
                    <strong>Customer:</strong>{" "}
                    {order.user?.name}
                  </p>

                  <p>
                    <strong>Food:</strong>{" "}
                    {order.items?.[0]?.food?.name}
                  </p>

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {order.items?.[0]?.quantity}
                  </p>

                  <p>
                    <strong>Total:</strong>{" "}
                    ৳ {order.totalAmount}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {order.status}
                  </p>

                </div>

              ))
            )}

          </section>


          {/* Monthly Revenue */}
          <section className="dashboard-section">

            <h2>
              Monthly Revenue
            </h2>

            {monthlyRevenue.length === 0 ? (
              <p>
                No revenue data found.
              </p>
            ) : (
              monthlyRevenue.map((item) => (

                <div
                  className="order-card"
                  key={`${item._id.year}-${item._id.month}`}
                >

                  <p>
                    <strong>Year:</strong>{" "}
                    {item._id.year}
                  </p>

                  <p>
                    <strong>Month:</strong>{" "}
                    {item._id.month}
                  </p>

                  <p>
                    <strong>Revenue:</strong>{" "}
                    ৳ {item.totalRevenue}
                  </p>

                </div>

              ))
            )}

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;