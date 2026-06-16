import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
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

  const handleAdminLogin = (e) => {
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

      alert("Admin Login Successful");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">🔐</div>

        <h1>Admin Login</h1>

        <p>Only authorized admins can access this panel.</p>

        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login as Admin</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;