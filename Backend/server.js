const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Order Routes
app.use("/api/orders", orderRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Food Routes
app.use("/api/foods", foodRoutes);

//dashboard
app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);


app.get("/", (req, res) => {
  res.send("Restaurant Management System API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});