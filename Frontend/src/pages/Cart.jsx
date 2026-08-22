import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // Increase quantity
  const increaseQuantity = (foodId) => {
    const updatedCart = cart.map((item) =>
      item.food === foodId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Decrease quantity
  const decreaseQuantity = (foodId) => {
    const updatedCart = cart
      .map((item) =>
        item.food === foodId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Remove item
  const removeItem = (foodId) => {
    const updatedCart = cart.filter(
      (item) => item.food !== foodId
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Calculate total
  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      {/* Header */}
      <header className="cart-header">

        <div>
          <h1>🛒 Shopping Cart</h1>
          <p>Review your items before checkout</p>
        </div>

        <button
          className="cart-menu-btn"
          onClick={() => navigate("/menu")}
        >
          🍔 Food Menu
        </button>

      </header>


      {/* Main */}
      <main className="cart-container">

        {cart.length === 0 ? (

          /* Empty Cart */
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added any
              food yet.
            </p>

            <button
              onClick={() => navigate("/menu")}
            >
              🍔 Explore Food Menu
            </button>

          </div>

        ) : (

          <div className="cart-layout">

            {/* Cart Items */}
            <section className="cart-items">

              <h2>
                Your Items ({cart.length})
              </h2>

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.food}
                >

                  {/* Food Icon */}
                  <div className="cart-food-icon">
                    🍔
                  </div>


                  {/* Information */}
                  <div className="cart-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p className="cart-price">
                      ৳ {item.price} each
                    </p>

                    <p className="cart-subtotal">
                      Subtotal:
                      <strong>
                        {" "}৳ {item.price * item.quantity}
                      </strong>
                    </p>

                  </div>


                  {/* Quantity */}
                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.food)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.food)
                      }
                    >
                      +
                    </button>

                  </div>


                  {/* Remove */}
                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.food)
                    }
                  >
                    🗑️
                  </button>

                </div>

              ))}

            </section>


            {/* Order Summary */}
            <aside className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items</span>
                <span>
                  {cart.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  ৳ {totalAmount}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span>
                  ৳ {totalAmount}
                </span>
              </div>

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed to Checkout →
              </button>

              <button
                className="continue-btn"
                onClick={() =>
                  navigate("/menu")
                }
              >
                ← Continue Shopping
              </button>

            </aside>

          </div>

        )}

      </main>

    </div>
  );
}

export default Cart;