import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (index) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const addToCart = (product) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];

    oldCart.push({
      ...product,
      qty: 1,
    });

    localStorage.setItem("cart", JSON.stringify(oldCart));
    alert("Added To Cart ✅");
  };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="empty-orders-box">
          <div className="empty-orders-icon">❤️</div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save your favorite products here and purchase them later.
          </p>

          <Link to="/">
            <button className="shop-btn">Explore Products</button>
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map((item, index) => (
            <div className="premium-card" key={index}>
              <Link to={`/product/${item._id}`}>
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="card-content">
                <h3>{item.name}</h3>
                <p className="desc">{item.description}</p>
                <p className="price">₹{item.price}</p>

                <div className="card-buttons">
                  <button onClick={() => addToCart(item)}>
                    Add To Cart
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;