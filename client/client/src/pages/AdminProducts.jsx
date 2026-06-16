import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
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
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-products-page">
      <h1>Admin Product Management 📦</h1>

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
          <h2>All Products</h2>

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
                  <span>Stock: {product.stock}</span>
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

export default AdminProducts;