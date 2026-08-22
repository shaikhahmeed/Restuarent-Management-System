const adminOnly = require("../middleware/adminMiddleware");
const express = require("express");

const router = express.Router();

const {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood
} = require("../controllers/foodController");

const { protect } = require("../middleware/authMiddleware");


// Get all foods
router.get("/", getFoods);

// Get single food
router.get("/:id", getFoodById);

// Add food
router.post("/", protect, adminOnly, addFood);

// Update food
router.put("/:id", protect, adminOnly, updateFood);

// Delete food
router.delete("/:id", protect, adminOnly, deleteFood);


module.exports = router;