import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQty = (index) => {
    const newCart = [...cart];
    newCart[index].qty = (newCart[index].qty || 1) + 1;
    updateCart(newCart);
  };

  const decreaseQty = (index) => {
    const newCart = [...cart];
    newCart[index].qty = newCart[index].qty || 1;

    if (newCart[index].qty > 1) {
      newCart[index].qty -= 1;
      updateCart(newCart);
    }
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div className="premium-cart-page">
      <h1>Your Shopping Cart 🛒</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-box">
          <h2>Your cart is empty</h2>
          <p>Add some products to continue shopping.</p>

          <Link to="/">
            <button>Go Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((item, index) => (
              <div className="premium-cart-item" key={index}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <h3>₹{item.price}</h3>

                  <div className="qty-box">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.qty || 1}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>

            <Link to="/">
              <button className="continue-btn">Continue Shopping</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;