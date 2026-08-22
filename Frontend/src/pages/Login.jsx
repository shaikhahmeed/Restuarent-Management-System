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
    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

        <br />
        <br />

        <button
          type="button"
          onClick={() =>
            navigate("/register")
          }
        >
          Create New Account
        </button>

      </form>

    </div>
  );
}

export default Login;