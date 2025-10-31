import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import Stars from "./Stars";
import { reviewContextObj, type ReviewType } from "../Context/ReviewContext";
import { userContextObj } from "../Context/UserContext";
 
export type ReviewFormProps = {
  bookId: string;
  onCancel: () => void;
};
 
 
const ReviewForm = ({ bookId, onCancel }: ReviewFormProps) => {
  const {currentUser} = useContext(userContextObj)
  const { addReviewForBook } = useContext(reviewContextObj);
  const [review, setReview] = useState<Omit<ReviewType, "rating">>({ title: "", content: "", displayName: currentUser?.username as string,});
 
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
 
  const { title, content} = review;
 
  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setReview({ ...review, [e.target.name]: e.target.value });
  }
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error on new submission
 
    // Validate that all fields are filled
    if (rating === 0 || !title || !content ) {
      setError("Please fill in all fields and provide a rating.");
      return;
    }
 
    const newReview: ReviewType = { ...review, rating};
 
    await addReviewForBook(bookId, newReview);
 
    // After submission, call onCancel to hide the form.
    // The context will automatically refresh the review list.
    onCancel();
  };
 
  return (
    <div className="text-center">
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <h5 className="card-title mb-3 text-center text-success">Write a Review as {currentUser?.username}</h5>
 
        <div className="mb-3">
          <label className="form-label"></label><Stars value={rating} onChange={setRating} />
        </div>
 
        <div className="mb-3">
          <label htmlFor="reviewTitle" className="form-label">Review Title</label>
          <input type="text" className="form-control" name="title" id="reviewTitle" value={title} onChange={handleInput} required/>
        </div>
 
        <div className="mb-3">
          <label htmlFor="reviewContent" className="form-label">Review Content</label>
          <textarea className="form-control" name="content" id="reviewContent" rows={3} value={content} onChange={handleInput} required/>
        </div>
       
        {/* Display validation error message */}
        {error && <div className="alert alert-danger p-2">{error}</div>}
 
        <div className="d-flex justify-content-end mt-3">
          <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-success">Submit Review</button>
        </div>
      </form>
    </div>
  );
};
 
export default ReviewForm;