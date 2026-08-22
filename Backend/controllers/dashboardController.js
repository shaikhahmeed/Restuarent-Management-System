const User = require("../models/User");
const Food = require("../models/Food");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalFoods = await Food.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    res.json({
      totalUsers,
      totalFoods,
      totalOrders,
      pendingOrders,
      totalRevenue:
        revenue.length > 0
          ? revenue[0].totalRevenue
          : 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .populate("items.food", "name price")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(recentOrders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const monthlyRevenue = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          totalRevenue: {
            $sum: "$totalAmount"
          }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    res.json(monthlyRevenue);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getMonthlyRevenue,
};
