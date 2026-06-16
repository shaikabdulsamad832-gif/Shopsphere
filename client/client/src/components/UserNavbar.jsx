import { Link, useNavigate } from "react-router-dom";

function UserNavbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="premium-navbar">
      <Link to="/" className="logo">
        🛒 ShopSphere
      </Link>

      <div className="nav-links">
        <Link to="/">🏠 Home</Link>

        {user && (
          <>
            <Link to="/wishlist">❤️ Wishlist</Link>
            <Link to="/profile">👤 Profile</Link>
            <Link to="/cart">🛒 Cart</Link>
            <Link to="/orders">📦 Orders</Link>
          </>
        )}

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {user ? (
          <>
            <div className="user-badge">👤 Account</div>

            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">🔐 Login</Link>
            <Link to="/register">✨ Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default UserNavbar;