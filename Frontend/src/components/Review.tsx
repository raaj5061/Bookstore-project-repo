import { useEffect, useContext, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { reviewContextObj, type ReviewType } from "../Context/ReviewContext";
import { bookContextObj } from "../Context/BookContext";

type AllReviewsType = ReviewType & { bookId: string; bookName: string };

function ReviewManagement() {
  const { allBooks, getAllReviews, deleteReview } = useContext(reviewContextObj);
  const { data } = useContext(bookContextObj);
  const [bookname, setBookName] = useState<string>("");

  useEffect(() => {
    getAllReviews();
  }, [bookname]);

  const allReviews = allBooks.flatMap(book =>
    (book.reviews || []).map(review => ({
      ...review,
      bookId: book.id as string,
      bookName: book.bookname,
    }))
  );

  const bookNamesList = data.map(book => book.bookname);

  // CORRECTED FILTERING LOGIC
  const reviewsToRender = allReviews.filter(review =>
    bookname === "" ||
    review.bookName === bookname
  );

  const handleDeleteReview = async (reviewToDelete: AllReviewsType) => {
    if (window.confirm(`Are you sure you want to delete the review for "${reviewToDelete.bookName}"?`)) {
      await deleteReview(reviewToDelete.bookId, reviewToDelete);
      getAllReviews();
    }
  };

  return (
    <div className="container-fluid p-4">
      <h3 className="mb-4">Review Management</h3>
      <select
        name="bookname"
        onChange={(e) => { setBookName(e.target.value) }}
        className="form-select w-50 mb-5"
        value={bookname}
      >
        <option value="">All Books</option>
        {bookNamesList.map((book, idx) =>
          <option value={book} key={idx}>{book}</option>
        )}
      </select>

      <ul className="list-group">
      
        {reviewsToRender.map((review, index) => (
          <li key={review.bookId + review.displayName + index} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{review.title}</div>
              <p className="mb-1">{review.content}</p>
              <small className="text-muted">For: <strong>{review.bookName}</strong>| By: <strong>{review.displayName}</strong>{" "}</small>
            </div>

            <div className="d-flex flex-column align-items-end">
              <span className="badge bg-warning text-dark">{review.rating} <FaStar size={11} /></span>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteReview(review)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewManagement;