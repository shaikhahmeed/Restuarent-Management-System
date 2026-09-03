import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const items = cart.map((item) => ({
        food: item.food,
        quantity: item.quantity,
      }));

      const response = await API.post(
        "/orders",
        {
          items,
          totalAmount,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(
        "Order placed:",
        response.data
      );

      alert("Order placed successfully!");

      localStorage.removeItem("cart");

      navigate("/my-orders");

    } catch (error) {
      console.error(
        "Failed to place order:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  return (
    <div className="checkout-page">

      <header className="checkout-header">

        <div>
          <h1>💳 Checkout</h1>
          <p>
            Review your order and confirm payment
          </p>
        </div>

      </header>

      <main className="checkout-container">

        {cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Please add some food before checkout.
            </p>

            <button
              onClick={() => navigate("/menu")}
            >
              🍔 Go to Menu
            </button>

          </div>

        ) : (

          <div className="checkout-layout">

            <section className="checkout-items">

              <h2>Order Summary</h2>

              {cart.map((item) => (

                <div
                  className="checkout-item"
                  key={item.food}
                >

                  <div>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Quantity:
                      {" "}
                      {item.quantity}
                    </p>

                  </div>

                  <strong>
                    ৳ {item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </section>


            <aside className="checkout-summary">

              <h2>Payment Details</h2>

              <label>
                Select Payment Method
              </label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              >

                <option value="Cash">
                  Cash
                </option>

                <option value="Card">
                  Card
                </option>

                <option value="Online">
                  Online Payment
                </option>

              </select>

              <div className="summary-divider"></div>

              <div className="summary-total">

                <span>Total</span>

                <span>
                  ৳ {totalAmount}
                </span>

              </div>

              <button
                className="checkout-btn"
                onClick={handlePlaceOrder}
              >
                📦 Place Order
              </button>

              <button
                className="continue-btn"
                onClick={() =>
                  navigate("/cart")
                }
              >
                ← Back to Cart
              </button>

            </aside>

          </div>

        )}

      </main>

    </div>
  );
}

export default Checkout;