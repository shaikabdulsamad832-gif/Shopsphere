import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("https://shopsphere-backend-zlug.onrender.com/api/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.error || error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account 🚀</h2>
        <p>Join ShopSphere today</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;