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

  console.log("Order placed:", response.data);

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

return ( <div>

```
  <h1>💳 Checkout</h1>

  {cart.length === 0 ? (

    <div>

      <p>Your cart is empty.</p>

      <button
        onClick={() => navigate("/menu")}
      >
        🍔 Go to Menu
      </button>

    </div>

  ) : (

    <div>

      <h2>Order Summary</h2>

      {cart.map((item) => (

        <div key={item.food}>

          <p>
            <strong>{item.name}</strong>
          </p>

          <p>
            Price: ৳ {item.price}
          </p>

          <p>
            Quantity: {item.quantity}
          </p>

          <p>
            Subtotal: ৳{" "}
            {item.price * item.quantity}
          </p>

          <hr />

        </div>

      ))}

      <h2>
        Total: ৳ {totalAmount}
      </h2>

      <h2>Payment Method</h2>

      <select
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
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

      <br />
      <br />

      <button
        onClick={() => navigate("/cart")}
      >
        ← Back to Cart
      </button>

      {" "}

      <button
        onClick={handlePlaceOrder}
      >
        📦 Place Order
      </button>

    </div>

  )}

</div>

);
}

export default Checkout;
