const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentOrders,
  getMonthlyRevenue,
} = require("../controllers/dashboardController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

router.get(
  "/stats",
  protect,
  admin,
  getDashboardStats
);

router.get(
  "/recent-orders",
  protect,
  admin,
  getRecentOrders
);

router.get(
  "/monthly-revenue",
  protect,
  admin,
  getMonthlyRevenue
);

module.exports = router;