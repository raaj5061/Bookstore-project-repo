import { useContext } from "react";
import { reviewContextObj } from "../Context/ReviewContext";
import { FaStar } from "react-icons/fa";
 
type ReviewListProps = {
  bookId: string;
};
 
const ReviewList = ({ bookId }: ReviewListProps) => {
  const { reviews, isLoading, error } = useContext(reviewContextObj);
 
  if (isLoading) {
    return <p className="text-center mt-3">Loading reviews...</p>;
  }
 
  if (error) {
    return <p className="alert alert-danger mt-3">Error: {error}</p>;
  }
 
  if (reviews.length === 0) {
    return <p className="text-muted text-center mt-3">Be the first to write a review!</p>;
  }
 
  return (
    <div className="mt-4">
      <h5 className="text-success mb-3">User Reviews ({reviews.length})</h5>
      {reviews.map((review, index) => (
        <div key={index} className="border-bottom pb-3 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>{review.displayName}</strong>
            <div>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
              ))}
            </div>
          </div>
          <h6 className="mb-1">{review.title}</h6>
          <p className="mb-0 text-muted">{review.content}</p>
        </div>
      ))}
    </div>
  );
};
 
export default ReviewList;