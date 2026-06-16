import { useState } from "react";
import axios from "axios";

function ProductReviews({ product, setProduct }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const reviews = product.reviews || [];

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const submitReview = async () => {
    if (!name || !comment) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/products/${product._id}/reviews`,
        {
          name,
          rating,
          comment,
        }
      );

      setProduct(res.data.product);

      setName("");
      setRating(5);
      setComment("");

      alert("Review added successfully ⭐");
    } catch (error) {
      alert("Failed to add review");
    }
  };

  return (
    <div className="reviews-section">
      <h2>⭐ Customer Reviews</h2>

      <div className="reviews-summary">
        <div className="avg-rating">
          <h1>{averageRating}</h1>
          <p>Average Rating</p>
        </div>

        <div className="review-count">
          <h1>{reviews.length}</h1>
          <p>Total Reviews</p>
        </div>
      </div>

      <div className="review-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐ 5</option>
          <option value={4}>⭐⭐⭐⭐ 4</option>
          <option value={3}>⭐⭐⭐ 3</option>
          <option value={2}>⭐⭐ 2</option>
          <option value={1}>⭐ 1</option>
        </select>

        <textarea
          rows="4"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={submitReview}>Submit Review</button>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <h3>No Reviews Yet</h3>
            <p>Be the first customer to review this product.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <div className="review-header">
                <div className="review-avatar">
                  {review.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4>{review.name}</h4>
                  <small>{new Date(review.date).toLocaleDateString()}</small>
                </div>
              </div>

              <div className="review-stars">
                {"⭐".repeat(review.rating)}
              </div>

              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductReviews;