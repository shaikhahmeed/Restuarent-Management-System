import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./Dashboard";
import Foods from "./pages/Foods";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Register from "./pages/Register";
import FoodMenu from "./pages/FoodMenu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

<Route
  path="/dashboard"
  element={
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  }
/>

<Route
  path="/foods"
  element={
    <AdminRoute>
      <Foods />
    </AdminRoute>
  }
/>

<Route
  path="/orders"
  element={
    <AdminRoute>
      <Orders />
    </AdminRoute>
  }
/>

<Route
  path="/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>

        <Route
        path="/register"
        element={<Register />}
        />

        <Route
        path="/menu"
        element={<FoodMenu />}
        />

      <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>

<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;