import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const finalTotal = total - discount;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    const code = coupon.toUpperCase();

    if (code === "SHOP10") {
      setDiscount(Math.floor(total * 0.1));
      setCouponMessage("SHOP10 applied! You saved 10% 🎉");
    } else if (code === "SAVE20") {
      setDiscount(Math.floor(total * 0.2));
      setCouponMessage("SAVE20 applied! You saved 20% 🎉");
    } else if (code === "WELCOME15") {
      setDiscount(Math.floor(total * 0.15));
      setCouponMessage("WELCOME15 applied! You saved 15% 🎉");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code ❌");
    }
  };

  const saveOrder = (paymentId) => {
    const newOrder = {
      ...form,
      items: cart,
      total: finalTotal,
      originalTotal: total,
      discount,
      coupon: coupon.toUpperCase(),
      paymentId,
      paymentMode: "Razorpay",
      status: "Processing",
      date: new Date().toLocaleString(),
    };

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    oldOrders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(oldOrders));
    localStorage.removeItem("cart");

    setCart([]);
    setOrderPlaced(true);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://shopsphere-backend-zlug.onrender.com/api/payment/create-order",
        { amount: finalTotal }
      );

      if (!data.success) {
        alert("Payment order creation failed");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "ShopSphere",
        description: "E-commerce Order Payment",
        order_id: data.order.id,

        handler: function (response) {
          alert("Payment Successful ✅");
          saveOrder(response.razorpay_payment_id);
        },

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Payment failed"
      );
    }
  };

  if (orderPlaced) {
    return (
      <div className="success-page">
        <div className="premium-success-card">
          <div className="success-icon">✅</div>

          <h1>Payment Successful!</h1>

          <p>Your order has been placed successfully.</p>

          <div className="success-info">
            <div>
              <h3>🚚 Delivery</h3>
              <span>Expected in 3-5 days</span>
            </div>

            <div>
              <h3>💳 Payment</h3>
              <span>Razorpay Test Mode</span>
            </div>

            <div>
              <h3>🎟 Coupon</h3>
              <span>{discount > 0 ? `Saved ₹${discount}` : "No Coupon"}</span>
            </div>
          </div>

          <Link to="/orders">
            <button>View My Orders</button>
          </Link>

          <Link to="/">
            <button className="continue-success-btn">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout 💳</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePayment}>
          <h2>Delivery Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={cart.length === 0}>
            Pay ₹{finalTotal} with Razorpay
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div className="checkout-item" key={index}>
                  <span>{item.name}</span>
                  <span>
                    ₹{item.price} × {item.qty || 1}
                  </span>
                </div>
              ))}

              <div className="coupon-box">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />

                <button type="button" onClick={applyCoupon}>
                  Apply
                </button>
              </div>

              <p className="coupon-message">{couponMessage}</p>

              <div className="checkout-total-row">
                <span>Original Total</span>
                <span>₹{total}</span>
              </div>

              <div className="checkout-total-row discount-row">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>

              <div className="checkout-total">
                <span>Final Total</span>
                <span>₹{finalTotal}</span>
              </div>

              <div className="coupon-help">
                Try: <strong>SHOP10</strong>, <strong>SAVE20</strong>,{" "}
                <strong>WELCOME15</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;