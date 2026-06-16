import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState({});
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    setUser(JSON.parse(localStorage.getItem("user")) || {});
  }, []);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue =
    orders.length > 0 ? Math.floor(revenue / orders.length) : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          productData
        );
        alert("Product updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/products", productData);
        alert("Product added successfully");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
    });
  };

  const deleteProduct = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard 📊</h1>

      <div className="admin-stats">
        <div className="admin-card">
          <h2>₹{revenue}</h2>
          <p>💰 Revenue</p>
        </div>

        <div className="admin-card">
          <h2>{products.length}</h2>
          <p>📦 Products</p>
        </div>

        <div className="admin-card">
          <h2>{orders.length}</h2>
          <p>🛒 Orders</p>
        </div>

        <div className="admin-card">
          <h2>{wishlist.length}</h2>
          <p>❤️ Wishlist</p>
        </div>
      </div>

      <div className="analytics-panel">
        <h2>📈 Store Analytics</h2>

        <div className="analytics-grid">
          <div className="analytics-box">
            <h3>Top Product</h3>
            <p>{products.length > 0 ? products[0].name : "No Products"}</p>
          </div>

          <div className="analytics-box">
            <h3>Average Order Value</h3>
            <p>₹{avgOrderValue}</p>
          </div>

          <div className="analytics-box">
            <h3>Store Status</h3>
            <p>🟢 Active</p>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-panel">
          <h2>Recent Orders</h2>

          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders
              .slice(-5)
              .reverse()
              .map((order, index) => (
                <div className="admin-row" key={index}>
                  <span>Order #{1001 + index}</span>
                  <strong>₹{order.total}</strong>
                </div>
              ))
          )}
        </div>

        <div className="admin-panel">
          <h2>Recent User</h2>

          {user.email ? (
            <div className="admin-user">
              <div className="admin-avatar">👤</div>

              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>
          ) : (
            <p>No user logged in</p>
          )}
        </div>
      </div>

      <div className="admin-product-layout">
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <div className="admin-products-table">
          <h2>Product Management</h2>

          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((product) => (
              <div className="admin-product-row" key={product._id}>
                <img src={product.image} alt={product.name} />

                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <strong>₹{product.price}</strong>
                  <span> Stock: {product.stock}</span>
                </div>

                <div className="admin-actions">
                  <button onClick={() => editProduct(product)}>Edit</button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;