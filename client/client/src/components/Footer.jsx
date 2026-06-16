function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>🛒 ShopSphere</h2>
          <p>
            Your premium destination for smart shopping,
            gadgets, fashion and daily essentials.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/wishlist">Wishlist</a>
          <a href="/cart">Cart</a>
          <a href="/orders">Orders</a>
        </div>

        <div className="footer-links">
          <h3>Support</h3>
          <a href="/">Contact Us</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">Help Center</a>
        </div>

        <div className="footer-newsletter">
          <h3>Newsletter</h3>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button>Subscribe</button>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 ShopSphere. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;