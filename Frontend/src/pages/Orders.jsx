import { useEffect, useState } from "react";
import API from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Preparing":
        return "status-preparing";

      case "Delivered":
        return "status-delivered";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "";
    }
  };

  return (
    <div className="orders-page">

      {/* Page Header */}
      <div className="orders-header">
        <div>
          <h1>Order Management</h1>
          <p>Manage and monitor customer orders</p>
        </div>

        <div className="orders-count">
          <span>{orders.length}</span>
          <small>Total Orders</small>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="orders-message">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        /* Empty State */
        <div className="orders-message empty-orders">
          <div className="empty-order-icon">📦</div>
          <h2>No Orders Found</h2>
          <p>
            There are currently no customer orders
            available.
          </p>
        </div>
      ) : (
        /* Orders */
        <div className="orders-grid">

          {orders.map((order) => (

            <div
              className="admin-order-card"
              key={order._id}
            >

              {/* Order Header */}
              <div className="admin-order-header">

                <div>
                  <h2>
                    Order #
                    {order._id.slice(-6).toUpperCase()}
                  </h2>

                  <p className="order-full-id">
                    ID: {order._id}
                  </p>
                </div>

                <span
                  className={`order-status ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

              </div>

              {/* Customer Information */}
              <div className="customer-info">

                <h3>Customer Information</h3>

                <div className="customer-details">

                  <div className="customer-detail">
                    <span className="detail-label">
                      Name
                    </span>

                    <strong>
                      {order.user?.name || "N/A"}
                    </strong>
                  </div>

                  <div className="customer-detail">
                    <span className="detail-label">
                      Email
                    </span>

                    <strong>
                      {order.user?.email || "N/A"}
                    </strong>
                  </div>

                </div>
              </div>

              {/* Order Items */}
              <div className="order-items-section">

                <h3>Order Items</h3>

                <div className="order-items-list">

                  {order.items?.map((item) => (

                    <div
                      className="admin-order-item"
                      key={item._id}
                    >

                      <div className="item-info">

                        <strong>
                          {item.food?.name || "Unknown Food"}
                        </strong>

                        <span>
                          ৳ {item.food?.price || 0} ×{" "}
                          {item.quantity}
                        </span>

                      </div>

                      <strong className="item-total">
                        ৳{" "}
                        {(
                          (item.food?.price || 0) *
                          item.quantity
                        ).toFixed(2)}
                      </strong>

                    </div>

                  ))}

                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">

                <div className="summary-row">
                  <span>Payment Method</span>
                  <strong>
                    {order.paymentMethod}
                  </strong>
                </div>

                <div className="summary-row total-row">
                  <span>Total Amount</span>

                  <strong>
                    ৳ {order.totalAmount}
                  </strong>
                </div>

              </div>

              {/* Status Update */}
              <div className="status-update-section">

                <label>
                  Update Order Status
                </label>

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

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;