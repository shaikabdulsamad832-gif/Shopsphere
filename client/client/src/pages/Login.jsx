import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Admin",
          email: "admin@gmail.com",
          role: "admin",
        })
      );

      alert("Admin login successful");
      navigate("/admin");
      return;
    }

    try {
      const res = await axios.post("https://shopsphere-backend-zlug.onrender.com/api/users/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res.data.user,
          role: "user",
        })
      );

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-premium-page">
      <div className="login-left">
        <h1>Welcome Back 👋</h1>
        <p>
          Login to explore premium products, manage your cart, and continue
          shopping.
        </p>

        <div className="login-features">
          <span>🚚 Fast Delivery</span>
          <span>🔒 Secure Login</span>
          <span>🛒 Smart Shopping</span>
        </div>
      </div>

      <div className="login-box">
        <div className="login-icon">🛒</div>
        <h2>Login to ShopSphere</h2>
        <p className="login-subtitle">Enter your account details</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login Now</button>
        </form>

        <p className="auth-link">
          New user? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;