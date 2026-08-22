import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      const response = await API.get("/foods");

      console.log("Foods:", response.data);

      setFoods(response.data.foods || []);

    } catch (error) {
      console.error(
        "Failed to load foods:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Add Food to Cart
  const addToCart = (food) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(
      (item) => item.food === food._id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.food === food._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          food: food._id,
          name: food.name,
          price: food.price,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${food.name} added to cart!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    navigate("/login");
  };

  return (
    <div className="menu-page">

      {/* Header */}
      <header className="menu-header">

        <div>
          <h1>🍽️ Restaurant Management System</h1>
          <p>Delicious food, made for you ❤️</p>
        </div>

        <div className="menu-actions">

          <button
            onClick={() => navigate("/cart")}
          >
            🛒 View Cart
          </button>

          <button
            onClick={() => navigate("/my-orders")}
          >
            📋 My Orders
          </button>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* Food Section */}
      <main className="food-container">

        <div className="food-title">

          <h2>🍔 Our Food Menu</h2>

          <p>
            Choose your favorite food and add it
            to your cart.
          </p>

        </div>


        {/* Loading */}
        {loading ? (

          <div className="loading">
            <h3>Loading foods...</h3>
          </div>

        ) : foods.length === 0 ? (

          <div className="empty-food">
            <h3>No foods available.</h3>
            <p>Please check again later.</p>
          </div>

        ) : (

          <div className="food-grid">

            {foods.map((food) => (

              <div
                className="food-card"
                key={food._id}
              >

                {/* Food Image */}
                <div className="food-image">

                  {food.image ? (
                    <img
                      src={food.image}
                      alt={food.name}
                    />
                  ) : (
                    <span>🍔</span>
                  )}

                </div>


                {/* Food Information */}
                <div className="food-info">

                  <div className="food-card-header">

                    <h3>
                      {food.name}
                    </h3>

                    <span className="food-category">
                      {food.category}
                    </span>

                  </div>


                  <p className="food-description">
                    {food.description}
                  </p>


                  <div className="food-bottom">

                    <div>

                      <p className="food-price">
                        ৳ {food.price}
                      </p>

                      <p
                        className={
                          food.available
                            ? "available"
                            : "unavailable"
                        }
                      >
                        {food.available
                          ? "✓ Available"
                          : "✕ Unavailable"}
                      </p>

                    </div>


                    <button
                      className="add-cart-btn"
                      onClick={() =>
                        addToCart(food)
                      }
                      disabled={!food.available}
                    >
                      🛒 Add
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default FoodMenu;