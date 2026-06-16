import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    alert("Order status updated");
  };

  return (
    <div className="admin-orders-page">
      <h1>Admin Order Management 📦</h1>

      {orders.length === 0 ? (
        <div className="empty-orders-box">
          <h2>No Orders Found</h2>
          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order, index) => (
            <div className="admin-order-card" key={index}>
              <div className="admin-order-top">
                <div>
                  <h2>Order #{1001 + index}</h2>
                  <p>{order.date}</p>
                </div>

                <select
                  value={order.status || "Processing"}
                  onChange={(e) => updateStatus(index, e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="admin-order-info">
                <p><strong>Customer:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}, {order.city} - {order.pincode}</p>
                <p><strong>Payment:</strong> {order.paymentMode || "COD"}</p>
                <p><strong>Payment ID:</strong> {order.paymentId || "N/A"}</p>
              </div>

              <div className="admin-order-products">
                {order.items.map((item, i) => (
                  <div className="admin-order-product" key={i}>
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                    <strong>₹{item.price} × {item.qty || 1}</strong>
                  </div>
                ))}
              </div>

              <div className="admin-order-total">
                Total: ₹{order.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;