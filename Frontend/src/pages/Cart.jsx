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
localStorage.setItem("cart", JSON.stringify(updatedCart));


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
localStorage.setItem("cart", JSON.stringify(updatedCart));


};

// Remove item
const removeItem = (foodId) => {
const updatedCart = cart.filter(
(item) => item.food !== foodId
);


setCart(updatedCart);
localStorage.setItem("cart", JSON.stringify(updatedCart));


};

// Calculate total
const totalAmount = cart.reduce(
(total, item) => total + item.price * item.quantity,
0
);

const totalItems = cart.reduce(
(total, item) => total + item.quantity,
0
);

return ( <div className="cart-page">


  {/* Header */}
  <header className="cart-header">
    <div className="cart-brand">
      <div className="cart-brand-icon">🛒</div>

      <div>
        <h1>Shopping Cart</h1>
        <p>Review your items before checkout</p>
      </div>
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
          Looks like you haven't added any food yet.
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

          <div className="cart-items-header">
            <div>
              <h2>Your Items</h2>
              <p>
                {totalItems} item
                {totalItems !== 1 ? "s" : ""} in your cart
              </p>
            </div>

            <span className="cart-item-count">
              {cart.length} product
              {cart.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="cart-item-list">

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

                  <h3>{item.name}</h3>

                  <p className="cart-price">
                    ৳ {item.price} <span>each</span>
                  </p>

                  <p className="cart-subtotal">
                    Subtotal:
                    <strong>
                      {" "}৳ {item.price * item.quantity}
                    </strong>
                  </p>

                </div>

                {/* Quantity */}
                <div className="quantity-section">
                  <span className="quantity-label">
                    Quantity
                  </span>

                  <div className="quantity-control">

                    <button
                      aria-label={`Decrease ${item.name}`}
                      onClick={() =>
                        decreaseQuantity(item.food)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Increase ${item.name}`}
                      onClick={() =>
                        increaseQuantity(item.food)
                      }
                    >
                      +
                    </button>

                  </div>
                </div>

                {/* Remove */}
                <button
                  className="remove-btn"
                  aria-label={`Remove ${item.name}`}
                  onClick={() =>
                    removeItem(item.food)
                  }
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>

        </section>

        {/* Order Summary */}
        <aside className="cart-summary">

          <div className="summary-heading">
            <span className="summary-icon">🧾</span>

            <div>
              <h2>Order Summary</h2>
              <p>Final order details</p>
            </div>
          </div>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>৳ {totalAmount}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-delivery">
              FREE
            </span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <span>৳ {totalAmount}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
            <span>→</span>
          </button>

          <button
            className="continue-btn"
            onClick={() => navigate("/menu")}
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
