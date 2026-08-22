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
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(
        "My Orders:",
        response.data
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
    <div>

      <h1>📋 My Orders</h1>

      <div>
  <button onClick={() => navigate("/menu")}>
    🍔 Food Menu
  </button>

  {" "}

  <button onClick={() => navigate("/cart")}>
    🛒 Cart
  </button>

  {" "}

  <button onClick={() => navigate("/my-orders")}>
    📋 My Orders
  </button>
  <button onClick={handleLogout}>
             Logout
 </button>
      </div>

<br />

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (

        <div>

          <p>
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() =>
              navigate("/menu")
            }
          >
            🍔 Order Food
          </button>
        </div>

      ) : (

        <div>

          {orders.map((order) => (

            <div key={order._id}>

              <h2>
                Order ID: {order._id}
              </h2>

              <h3>Items</h3>

              {order.items.map((item) => (

                <div key={item._id}>

                  <p>
                    Food:{" "}
                    {item.food?.name}
                  </p>

                  <p>
                    Quantity:{" "}
                    {item.quantity}
                  </p>

                  <p>
                    Price: ৳{" "}
                    {item.food?.price}
                  </p>

                </div>

              ))}

              <p>
                <strong>
                  Total:
                </strong>{" "}
                ৳ {order.totalAmount}
              </p>

              <p>
                <strong>
                  Payment:
                </strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {order.status}
              </p>

              <p>
                <strong>
                  Ordered:
                </strong>{" "}
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>

              <hr />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyOrders;