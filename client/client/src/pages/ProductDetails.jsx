import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductReviews from "../components/ProductReviews";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://shopsphere-backend-zlug.onrender.com/api/products")
      .then((res) => {
        const selectedProduct = res.data.find((item) => item._id === id);
        setProduct(selectedProduct);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = () => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];

    oldCart.push({
      ...product,
      qty: 1,
    });

    localStorage.setItem("cart", JSON.stringify(oldCart));
    alert("Added To Cart ✅");
  };

  const addToWishlist = () => {
    const oldWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = oldWishlist.find((item) => item._id === product._id);

    if (alreadyExists) {
      alert("Already in Wishlist ❤️");
      return;
    }

    oldWishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(oldWishlist));
    alert("Added to Wishlist ❤️");
  };

  if (!product) {
    return <h2 className="page-title">Loading Product...</h2>;
  }

  return (
    <div className="details-wrapper">
      <div className="details-page">
        <div className="details-card">
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="details-info">
            <p className="details-tag">⭐ Premium Product</p>

            <h1>{product.name}</h1>

            <div className="rating">⭐⭐⭐⭐⭐ 4.8 Rating</div>

            <div className="price-section details-price-box">
              <span className="new-price">₹{product.price}</span>

              <span className="old-price">
                ₹{Math.floor(product.price * 1.3)}
              </span>

              <span className="discount">25% OFF</span>
            </div>

            <p>{product.description}</p>

            <div className="details-benefits">
              <span>🚚 Free Delivery</span>
              <span>🔒 Secure Payment</span>
              <span>⭐ Premium Quality</span>
              <span>↩ Easy Returns</span>
            </div>

            <div className="details-buttons">
              <button onClick={addToCart}>🛒 Add To Cart</button>

              <Link to="/cart">
                <button className="buy-btn">Buy Now</button>
              </Link>

              <button className="wishlist-btn" onClick={addToWishlist}>
                ❤️ Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductReviews product={product} setProduct={setProduct} />
    </div>
  );
}

export default ProductDetails;