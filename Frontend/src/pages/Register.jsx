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

  alert("Registration successful!");

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

return ( <div className="auth-page">

  <div className="auth-card">

    <div className="auth-icon">
      🍽️
    </div>

    <div className="auth-header">
      <h1>Create Account</h1>

      <p>
        Register as a customer to order
        delicious food
      </p>
    </div>

    <form
      className="auth-form"
      onSubmit={handleRegister}
    >

      <div className="auth-form-group">
        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />
      </div>

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
          placeholder="Create a password"
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
        Create Account
      </button>

    </form>

    <div className="auth-footer">

      <p>
        Already have an account?
      </p>

      <button
        type="button"
        className="auth-register-btn"
        onClick={() =>
          navigate("/login")
        }
      >
        Login to Your Account
      </button>

    </div>

  </div>

</div>

);
}

export default Register;
