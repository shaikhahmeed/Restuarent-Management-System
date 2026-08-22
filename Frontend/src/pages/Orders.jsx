import { useEffect, useState } from "react";
import API from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStatusUpdate = async (orderId, status) => {
  try {
    const response = await API.put(
      `/orders/${orderId}/status`,
      {
        status,
      }
    );

    console.log(
      "Order status updated:",
      response.data
    );

    alert("Order status updated successfully!");

    fetchOrders();

  } catch (error) {
    console.error(
      "Failed to update order status:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      "Failed to update order status"
    );
  }
};

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders");

      console.log("Orders:", response.data);

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
    fetchOrders();
  }, []);

  return (
    <div>

      <h1>Order Management</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (

        <div>

          {orders.map((order) => (

            <div key={order._id}>

              <h2>
                Order ID: {order._id}
              </h2>

              <p>
                Customer:{" "}
                {order.user?.name}
              </p>

              <p>
                Email:{" "}
                {order.user?.email}
              </p>

              <h3>Items</h3>

              {order.items?.map((item) => (

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
                Total: ৳{" "}
                {order.totalAmount}
              </p>

              <p>
                Payment:{" "}
                {order.paymentMethod}
              </p>

              <p>
                Status:{" "}
                {order.status}
              </p>
              <select
  value={order.status}
  onChange={(e) =>
    handleStatusUpdate(
      order._id,
      e.target.value
    )
  }
>
  <option value="Pending">
    Pending
  </option>

  <option value="Preparing">
    Preparing
  </option>

  <option value="Delivered">
    Delivered
  </option>

  <option value="Cancelled">
    Cancelled
  </option>
              </select>

              <hr />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;