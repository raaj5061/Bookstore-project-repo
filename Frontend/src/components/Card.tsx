import { useContext, useEffect, useState } from "react";
import { cartContextObj } from "../Context/CartContext";
import "../styles/Card.css";
import { reviewContextObj, type ReviewType } from "../Context/ReviewContext";
import { useNavigate } from "react-router";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export type BookType = {
  _id: string;
  image: string;
  bookname: string;
  category: string;
  quantity: number;
  price: number;
  publisher: string;
  description: string;
  author:string;
  reviews: ReviewType[];
};

type CardPropsType = {
  book: BookType;
  isCart: boolean;
};

function Card({ book, isCart }: CardPropsType) {
  const navigate = useNavigate();
  const [bookData] = useState<BookType>(book);
  const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(cartContextObj);
  const [showModal, setShowModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { averageRating, getReviewsForBook, isLoading } = useContext(reviewContextObj);

  useEffect(() => {
    if (showModal) {
      getReviewsForBook(String(book._id));
    }
  }, [showModal]);

  const handleAddToCart = () => {
    addToCart(bookData);
  };

  function directlyBuyNow() {
    addToCart(bookData);
    navigate("/checkout");
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div
        className="card-container p-3 bg-white mx-auto my-4 border border-gray-200 rounded shadow-sm"
      
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img src={book.image} className="img-fluid rounded-start " alt="book pic" 
            />
          </div>

          <div className="col-md-8">
            <div className="card-body mx-3">
              <h5 className="card-title">{book.bookname.slice(0, 30)}</h5>
              <p className="card-text">
                <small className="text-muted">Published by: {book.publisher}</small>
                </p>
                <p>
                <small className="text-muted">Author: {book.author}</small>
              </p>
              <p
                className="card-text text-info"
                style={{ cursor: "pointer" }}
                onClick={() => setShowModal(true)}
              >
                {isCart ? book.description : book.description.slice(0, 20) + "..."}
              </p>
              <h5 className="text-success">₹{book.price}</h5>
              {isCart && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => increaseQuantity(book._id as string)}
                    style={{ fontSize: "1.2rem", padding: "0.4rem 0.8rem" }}
                  >
                    +
                  </button>
                  <h4 style={{ margin: "0", minWidth: "40px", textAlign: "center" }}>
                    {book.quantity}
                  </h4>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => decreaseQuantity(String(book._id))}
                    style={{ fontSize: "1.2rem", padding: "0.4rem 0.8rem" }}
                  >
                    -
                  </button>
                </div>
              )}

              <div className="d-flex gap-2 mt-3">
                {!isCart && (
                  <>
                    {" "}
                    <button className="btn btn-warning btn-sm" onClick={directlyBuyNow}>
                      Buy Now
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                      }}
                    >
                      Add to Cart
                    </button>{" "}
                  </>
                )}
                {isCart && (
                  <button
                    className="btn btn-info  btn-sm mx-5"
                    onClick={() => removeFromCart(book._id as string)}
                  >
                    Remove from Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      {showModal && !isCart && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{book.bookname}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Description:</strong> {book.description}
                </p>
                <p>
                  <strong>Price:</strong> ₹{book.price}
                </p>
                {isLoading ? (
                  <p>Loading rating...</p>
                ) : (
                  <p>
                    <strong>Average Rating:</strong> {averageRating.toFixed(1)} ⭐
                  </p>
                )}
                <hr />
                {/* Review Form appears here when toggled */}
                {showReviewForm && (
                  <div className="mb-4">
                    <ReviewForm
                      bookId={book._id as string}
                      onCancel={() => setShowReviewForm(false)}
                    />
                  </div>
                )}
                {/* Review List is always visible in the modal */}
                <ReviewList bookId={book._id as string} />
              </div>
              {/* Modal footer is now clean */}
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleAddToCart();
                    handleCloseModal();
                  }}
                >
                  Add to Cart
                </button>
                {!showReviewForm && (
                  <button
                    className="btn btn-outline-success"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write a Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
