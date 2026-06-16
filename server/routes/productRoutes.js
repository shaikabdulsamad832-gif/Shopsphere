const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Product not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

router.post("/:id/reviews", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    product.reviews.unshift({
      name,
      rating,
      comment,
    });

    await product.save();

    res.json({
      message: "Review added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review" });
  }
});

module.exports = router;