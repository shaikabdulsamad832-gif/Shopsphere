const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    category: {
      type: String,
      default: "Electronics",
    },
    stock: {
      type: Number,
      default: 10,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);