const Food = require("../models/Food");

// Add Food
const addFood = async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Please provide name, description, price and category"
      });
    }

    const food = await Food.create({
      name,
      description,
      price,
      category,
      image: image || "",
      available: available !== undefined ? available : true
    });

    res.status(201).json({
      message: "Food added successfully",
      food
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Get All Foods
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: foods.length,
      foods
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Get Single Food
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    res.status(200).json(food);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Update Food
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: "Food updated successfully",
      food: updatedFood
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Delete Food
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    await Food.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Food deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood
};