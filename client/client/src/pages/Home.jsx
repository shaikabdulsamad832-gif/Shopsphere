import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const categories = ["All", "Headphones", "Watch", "Mouse", "Speaker", "Keyboard"];

  useEffect(() => {
    axios
      .get("https://shopsphere-backend-zlug.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    oldCart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(oldCart));
    alert("Added To Cart ✅");
  };

  const addToWishlist = (product) => {
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

  let filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();

    const matchesSearch = productName.includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || productName.includes(category.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "az") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "za") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <>
      <section className="premium-hero">
        <div className="hero-content">
          <p className="tagline">Premium Online Shopping</p>

          <h1>
            Upgrade Your Lifestyle
            <br />
            With ShopSphere
          </h1>

          <p className="hero-text">
            Discover trending gadgets, smart accessories, fashion products and
            daily essentials at amazing prices.
          </p>

          <button className="hero-btn">Explore Products</button>
        </div>

        <div className="hero-card">
          <h3>🔥 Today's Deal</h3>
          <p>Up To 50% OFF</p>
          <span>Limited Time Offer</span>
        </div>
      </section>

      <section className="features">
        <div>🚚 Free Delivery</div>
        <div>🔒 Secure Payment</div>
        <div>⭐ Premium Quality</div>
        <div>↩ Easy Returns</div>
      </section>

      <section className="products premium-products">
        <h2>Featured Products</h2>
        <p className="section-subtitle">Handpicked products from MongoDB</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active-category" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sort-box">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort Products</option>
            <option value="low-high">Price Low to High</option>
            <option value="high-low">Price High to Low</option>
            <option value="az">Name A to Z</option>
            <option value="za">Name Z to A</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <h2 className="page-title">No products found</h2>
          ) : (
            filteredProducts.map((product) => (
              <div className="premium-card" key={product._id}>
                <div className="product-img-box">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>

                  <button
                    className="heart-floating"
                    onClick={() => addToWishlist(product)}
                  >
                    ❤️
                  </button>
                </div>

                <div className="card-content">
                  <span className="category-badge">Electronics</span>

                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h3>{product.name}</h3>
                  </Link>

                  <p className="rating">⭐⭐⭐⭐⭐ 4.8</p>
                  <p className="desc">{product.description}</p>

                  <div className="price-section">
                    <span className="new-price">₹{product.price}</span>

                    <span className="old-price">
                      ₹{Math.floor(product.price * 1.3)}
                    </span>

                    <span className="discount">25% OFF</span>
                  </div>

                  <div className="card-buttons">
                    <button onClick={() => addToCart(product)}>🛒 Add</button>

                    <Link to={`/product/${product._id}`}>
                      <button className="details-btn">👁 Details</button>
                    </Link>

                    <button
                      className="wishlist-btn"
                      onClick={() => addToWishlist(product)}
                    >
                      ❤️ Save
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default Home;