import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedUser =
      JSON.parse(localStorage.getItem("user")) || {};

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setUser(savedUser);
    setOrders(savedOrders);
    setWishlist(savedWishlist);
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>{user.name || "Guest User"}</h1>

        <p>{user.email || "No Email Found"}</p>

        <div className="profile-stats">

          <div>
            <h2>{orders.length}</h2>
            <span>Orders</span>
          </div>

          <div>
            <h2>{wishlist.length}</h2>
            <span>Wishlist</span>
          </div>

          <div>
            <h2>⭐</h2>
            <span>Premium User</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;