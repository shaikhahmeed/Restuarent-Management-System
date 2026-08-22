import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/users/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(
        "Registration successful:",
        response.data
      );

      alert(
        "Registration successful!"
      );

      navigate("/login");

    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div>

      <h1>Customer Registration</h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

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
          Register
        </button>

      </form>

      <br />

      <button
        onClick={() =>
          navigate("/login")
        }
      >
        Already have an account? Login
      </button>

    </div>
  );
}

export default Register;