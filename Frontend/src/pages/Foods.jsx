import { useEffect, useState } from "react";
import API from "../api/api";

function Foods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true,
  });

  const fetchFoods = async () => {
    try {
      const response = await API.get("/foods");

      console.log("Foods:", response.data);

      setFoods(response.data.foods);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddFood = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingFood) {
        response = await API.put(
          `/foods/${editingFood._id}`,
          {
            ...formData,
            price: Number(formData.price),
          }
        );

        alert("Food updated successfully!");
      } else {
        response = await API.post(
          "/foods",
          {
            ...formData,
            price: Number(formData.price),
          }
        );

        alert("Food added successfully!");
      }

      console.log("Food response:", response.data);

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        available: true,
      });

      setEditingFood(null);
      setShowForm(false);

      fetchFoods();
    } catch (error) {
      console.error(
        "Failed to save food:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to save food"
      );
    }
  };

  const handleDeleteFood = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await API.delete(
        `/foods/${id}`
      );

      console.log(
        "Food deleted:",
        response.data
      );

      alert("Food deleted successfully!");

      fetchFoods();
    } catch (error) {
      console.error(
        "Failed to delete food:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete food"
      );
    }
  };

  const handleEditFood = (food) => {
    setEditingFood(food);

    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      image: food.image || "",
      available: food.available,
    });

    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingFood(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      available: true,
    });
  };

  return (
    <div className="foods-page">

      {/* Header */}

      <div className="foods-header">

        <div>
          <h1>🍔 Food Management</h1>

          <p>
            Manage restaurant food items,
            prices and availability.
          </p>
        </div>

        <button
          className="add-food-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
              setEditingFood(null);
            }
          }}
        >
          {showForm
            ? "✕ Close Form"
            : "+ Add New Food"}
        </button>

      </div>


      {/* Add / Edit Form */}

      {showForm && (
        <div className="food-form-card">

          <div className="form-header">

            <div>
              <h2>
                {editingFood
                  ? "✏️ Edit Food"
                  : "➕ Add New Food"}
              </h2>

              <p>
                Enter the food information below.
              </p>
            </div>

          </div>


          <form
            className="food-form"
            onSubmit={handleAddFood}
          >

            <div className="form-group">

              <label>Food Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter food name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Price</label>

              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Category</label>

              <input
                type="text"
                name="category"
                placeholder="e.g. Burger, Pizza, Drinks"
                value={formData.category}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Image URL</label>

              <input
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleChange}
              />

            </div>


            <div className="form-group full-width">

              <label>Description</label>

              <textarea
                name="description"
                placeholder="Enter food description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />

            </div>


            <div className="form-group">

              <label>Availability</label>

              <select
                name="available"
                value={formData.available}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    available:
                      e.target.value === "true",
                  })
                }
              >

                <option value="true">
                  Available
                </option>

                <option value="false">
                  Unavailable
                </option>

              </select>

            </div>


            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-food-btn"
              >
                {editingFood
                  ? "Update Food"
                  : "Add Food"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Food List */}

      <div className="foods-list-section">

        <div className="foods-list-header">

          <div>
            <h2>All Foods</h2>

            <p>
              {foods.length} food item
              {foods.length !== 1 ? "s" : ""}{" "}
              available in the system.
            </p>
          </div>

        </div>


        {loading ? (
          <div className="foods-message">
            <p>Loading foods...</p>
          </div>

        ) : foods.length === 0 ? (

          <div className="foods-message">

            <div className="empty-food-icon">
              🍽️
            </div>

            <h3>No Foods Found</h3>

            <p>
              Add your first food item to
              the restaurant menu.
            </p>

          </div>

        ) : (

          <div className="admin-food-grid">

            {foods.map((food) => (

              <div
                className="admin-food-card"
                key={food._id}
              >

                {/* Image */}

                <div className="admin-food-image">

                  {food.image ? (
                    <img
                      src={food.image}
                      alt={food.name}
                    />
                  ) : (
                    <span>🍽️</span>
                  )}

                  <span
                    className={
                      food.available
                        ? "status-badge available-badge"
                        : "status-badge unavailable-badge"
                    }
                  >
                    {food.available
                      ? "Available"
                      : "Unavailable"}
                  </span>

                </div>


                {/* Information */}

                <div className="admin-food-info">

                  <div className="admin-food-title">

                    <h3>{food.name}</h3>

                    <span className="category-badge">
                      {food.category}
                    </span>

                  </div>


                  <p className="admin-food-description">
                    {food.description}
                  </p>


                  <div className="admin-food-bottom">

                    <strong className="admin-food-price">
                      ৳ {food.price}
                    </strong>

                    <div className="food-actions">

                      <button
                        className="edit-food-btn"
                        onClick={() =>
                          handleEditFood(food)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-food-btn"
                        onClick={() =>
                          handleDeleteFood(food._id)
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Foods;