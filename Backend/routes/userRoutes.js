const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  createAdmin,
  getAllUsers
} = require("../controllers/userController");

const {
  protect,
  admin
} = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/create-admin", createAdmin);

router.get(
  "/",
  protect,
  admin,
  getAllUsers
);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user
  });
});

module.exports = router;