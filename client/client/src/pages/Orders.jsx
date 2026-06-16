import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders([...savedOrders].reverse());
  }, []);

  const getStatusIcon = (status) => {
    if (status === "Packed") return "📦";
    if (status === "Shipped") return "🚚";
    if (status === "Delivered") return "✅";
    return "🟡";
  };

  const isActive = (orderStatus, step) => {
    const steps = ["Processing", "Packed", "Shipped", "Delivered"];
    return steps.indexOf(step) <= steps.indexOf(orderStatus || "Processing");
  };

  return (
    <div className="orders-page">
      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (
        <div className="empty-orders-box">
          <div className="empty-orders-icon">📦</div>

          <h2>No Orders Yet</h2>

          <p>
            You have not placed any orders yet. Start shopping and your orders
            will appear here.
          </p>

          <Link to="/">
            <button>Start Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => {
            const status = order.status || "Processing";

            return (
              <div className="order-card" key={index}>
                <div className="order-top">
                  <div>
                    <h2>Order #{1001 + index}</h2>
                    <p className="order-date">Placed on {order.date}</p>
                  </div>

                  <div className="status-badge">
                    {getStatusIcon(status)} {status}
                  </div>
                </div>

                <div className="order-address-box">
                  <h3>📍 Delivery Address</h3>
                  <p>{order.name}</p>
                  <p>{order.phone}</p>
                  <p>{order.address}</p>
                  <p>
                    {order.city} - {order.pincode}
                  </p>
                </div>

                <div className="payment-info">
                  <p>
                    <strong>💳 Payment:</strong>{" "}
                    {order.paymentMode || "Cash On Delivery"}
                  </p>

                  <p>
                    <strong>🆔 Payment ID:</strong>{" "}
                    {order.paymentId || "N/A"}
                  </p>

                  {order.discount > 0 && (
                    <p>
                      <strong>🎟 Coupon:</strong> {order.coupon} | Saved ₹
                      {order.discount}
                    </p>
                  )}
                </div>

                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div className="order-product" key={i}>
                      <img src={item.image} alt={item.name} />

                      <div className="product-info">
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.qty || 1}</p>
                      </div>

                      <strong>₹{item.price * (item.qty || 1)}</strong>
                    </div>
                  ))}
                </div>

                <div className="tracking-line">
                  <div
                    className={
                      isActive(status, "Processing")
                        ? "tracking-node active"
                        : "tracking-node"
                    }
                  >
                    <div className="circle">🟡</div>
                    <span>Processing</span>
                  </div>

                  <div
                    className={
                      isActive(status, "Packed")
                        ? "tracking-node active"
                        : "tracking-node"
                    }
                  >
                    <div className="circle">📦</div>
                    <span>Packed</span>
                  </div>

                  <div
                    className={
                      isActive(status, "Shipped")
                        ? "tracking-node active"
                        : "tracking-node"
                    }
                  >
                    <div className="circle">🚚</div>
                    <span>Shipped</span>
                  </div>

                  <div
                    className={
                      isActive(status, "Delivered")
                        ? "tracking-node active"
                        : "tracking-node"
                    }
                  >
                    <div className="circle">✅</div>
                    <span>Delivered</span>
                  </div>
                </div>

                <div className="order-footer">
                  <span>{order.items.length} Product(s)</span>
                  <strong>Total Paid: ₹{order.total}</strong>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;