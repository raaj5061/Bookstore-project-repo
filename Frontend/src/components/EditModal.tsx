import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { FiSave } from "react-icons/fi";
import type { BookType } from "./Card";
import { bookContextObj } from "../Context/BookContext";

type EditModalType = {
  book: BookType;
  onClose: () => void;
};

function EditModal({ book, onClose }: EditModalType) {
  const { editBook } = useContext(bookContextObj);
  const [bookData, setBookData] = useState<BookType>(book);

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editBook(bookData); 
    console.log("Updated Book:", bookData);
    onClose();
  };

  return (
   
    <div className="modal-overlay" style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000 
    }}>
      <div className="modal-content bg-white p-5 rounded shadow-lg" style={{ width: '90%', maxWidth: '500px' }}>
        <h2 className="text-xl font-bold mb-4">Edit Book: {book.bookname}</h2>
        <form onSubmit={handleSubmit} className="form-group">
          {/* Form fields with prefilled values from bookData */}
          <label htmlFor="bookname">Book Name</label>
          <input
            type="text"
            name="bookname"
            value={bookData.bookname}
            onChange={handleInput}
            className="form-control mb-2"
          />
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={bookData.category}
            onChange={handleInput}
            className="form-control mb-2"
          />
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            name="publisher"
            value={bookData.publisher}
            onChange={handleInput}
            className="form-control mb-2"
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleInput}
            rows={4}
            className="form-control mb-2"
          />
          <label htmlFor="price">Price ₹</label>
          <input
            type="number"
            name="price"
            value={bookData.price}
            onChange={handleInput}
            className="form-control mb-2"
          />
          
          <div className="flex justify-end mt-4">
            <button type="button" className="btn btn-secondary mr-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success" title="Save">
              <FiSave style={{ marginRight: 6, fontSize: 18 }} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;