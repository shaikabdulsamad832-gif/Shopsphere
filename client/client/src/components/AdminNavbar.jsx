import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
function AdminNavbar({ darkMode, setDarkMode }) {
  return (
    <nav className="premium-navbar admin-navbar">
      <Link to="/admin" className="logo">
        <FaShoppingCart className="logo-icon" />
        <span>ShopSphere Admin</span>
      </Link>

      <div className="nav-links">
        <Link to="/admin">📈 Dashboard</Link>
        <Link to="/admin/products">🛠 Products</Link>
        <Link to="/admin/orders">📦 Orders</Link>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <Link to="/">🏠 User Site</Link>
      </div>
    </nav>
  );
}

export default AdminNavbar;