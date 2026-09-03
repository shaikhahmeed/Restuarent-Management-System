import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", {
        email,
        password,
      });

      console.log(
        "Login successful:",
        response.data
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful!");

      // Redirect based on role
      if (response.data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/menu");
      }

    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo / Icon */}
        <div className="auth-icon">
          🍽️
        </div>

        <div className="auth-header">
          <h1>Welcome Back!</h1>

          <p>
            Login to your Restaurant Management
            account
          </p>
        </div>

        {/* Login Form */}
        <form
          className="auth-form"
          onSubmit={handleLogin}
        >

          <div className="auth-form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            className="auth-submit-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <div className="auth-footer">

          <p>
            Don't have an account?
          </p>

          <button
            type="button"
            className="auth-register-btn"
            onClick={() =>
              navigate("/register")
            }
          >
            Create New Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;

