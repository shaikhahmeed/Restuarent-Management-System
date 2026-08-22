const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");


// Customer Place Order
router.post("/", protect, placeOrder);

// Customer Order History
router.get("/my-orders", protect, getMyOrders);

// Admin Get All Orders
router.get("/", protect, adminOnly, getAllOrders);

// Admin Update Status
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;