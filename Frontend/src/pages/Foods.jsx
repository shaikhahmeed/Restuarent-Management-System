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

    console.log(
      "Food response:",
      response.data
    );

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

  return (
    <div className="foods-page">

      <h1>Food Management</h1>

      <button
    onClick={() => {
    setShowForm(!showForm);
    setEditingFood(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      available: true,
        });
    }}
    >
  {showForm
    ? "Close Form"
    : "+ Add New Food"}
</button>


      {/* Add Food Form */}

      {showForm && (
        <form onSubmit={handleAddFood}>

          <div>
            <label>
              Food Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter food name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>


          <div>
            <label>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>


          <div>
            <label>
              Price
            </label>

            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>


          <div>
            <label>
              Category
            </label>

            <input
              type="text"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>


          <div>
            <label>
              Image URL
            </label>

            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>


          <div>
            <label>
              Available
            </label>

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


          <br />

            <button type="submit">
             {editingFood
             ? "Update Food"
             : "Add Food"}
            </button>

        </form>
      )}


      <hr />


      {/* Food List */}

      <h2>All Foods</h2>

      {loading ? (
        <p>Loading foods...</p>

      ) : foods.length === 0 ? (
        <p>No foods found.</p>

      ) : (

        <div>

          {foods.map((food) => (

            <div key={food._id}>

              <h2>
                {food.name}
              </h2>

              <p>
                {food.description}
              </p>

              <p>
                Price: ৳ {food.price}
              </p>

              <p>
                Category: {food.category}
              </p>

              <p>
                Status:{" "}
                {food.available
                  ? "Available"
                  : "Unavailable"}
              </p>

             <button
                onClick={() => handleEditFood(food)}>
                Edit
             </button>

              <button
                onClick={() => handleDeleteFood(food._id)}
                >
                Delete
              </button>

              <hr />

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Foods;