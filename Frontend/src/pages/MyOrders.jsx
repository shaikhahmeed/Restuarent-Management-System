import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const fetchMyOrders = async () => {
    try {
      const response = await API.get(
        "/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOrders(response.data);

    } catch (error) {
      console.error(
        "Failed to load orders:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="orders-page">

      <header className="menu-header">

        <div>
          <h1>📋 My Orders</h1>
          <p>Track all your food orders</p>
        </div>

        <div className="menu-actions">

          <button onClick={() => navigate("/menu")}>
            🍔 Food Menu
          </button>

          <button onClick={() => navigate("/cart")}>
            🛒 Cart
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </header>

      <main className="food-container">

        {loading ? (

          <div className="loading">
            <h3>Loading orders...</h3>
          </div>

        ) : orders.length === 0 ? (

          <div className="empty-food">

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <button
              className="add-cart-btn"
              onClick={() => navigate("/menu")}
            >
              🍔 Order Food
            </button>

          </div>

        ) : (

          <div className="orders-grid">

            {orders.map((order) => (

              <div
                className="my-order-card"
                key={order._id}
              >

                <h3>Order #{order._id.slice(-6)}</h3>

                <p>
                  <strong>Total:</strong>
                  {" "}৳ {order.totalAmount}
                </p>

                <p>
                  <strong>Payment:</strong>
                  {" "}{order.paymentMethod}
                </p>

                <p>
                  <strong>Status:</strong>
                  {" "}{order.status}
                </p>

                <p>
                  <strong>Date:</strong>
                  {" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>

                <hr />

                <h4>Items</h4>

                {order.items.map((item) => (

                  <div key={item._id}>

                    <p>
                      🍔 {item.food?.name}
                    </p>

                    <p>
                      Qty: {item.quantity}
                    </p>

                  </div>

                ))}

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyOrders;