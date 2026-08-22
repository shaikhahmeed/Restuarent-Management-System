const Order = require("../models/Order");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No order items found"
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      paymentMethod
    });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


// My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    })
      .populate("items.food")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Admin: Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.food")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};