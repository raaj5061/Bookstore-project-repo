import React, { useState, useContext, type ChangeEvent, type FormEvent } from "react";
import "../styles/InventoryManagement.css";
import Carder from "./Carder";
import { bookContextObj } from "../Context/BookContext";
import type { BookType } from "./Card";

function InventoryManagement() {
  const { data,fetchBooks } = useContext(bookContextObj);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [stockType, setStockType] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const total = data.reduce((acc, book) => acc + book.price * book.quantity, 0);

  const lowStockCount = data.filter((book) => book.quantity > 0 && book.quantity <= 30).length;
  const outOfStockCount = data.filter((book) => book.quantity === 0).length;

  function handleCloseModal() {
    setShowModal(false);
  }

  const [formData, setFormData] = useState({
    _id:"",
    bookname: "", 
    author:"",
    description: "",
    price: 0,
    publisher: "",
    quantity: 0,
    reviews:[],
    category:"",
    image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fbook-jpg&psig=AOvVaw3MGwFT2fHkxxeR3VdIAX7V&ust=1759550083917000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKjdnoSRh5ADFQAAAAAdAAAAABAE"
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  async function enterBook(formData:BookType) {
    let res=await fetch('http://localhost:3000/books',{
      method:'POST',
      headers:{ "Content-Type": "application/json" },
      body:JSON.stringify(formData)
    })
    if(res.status===201){
      fetchBooks()
    }
    else{
      alert('Erroooorrrr occurred')
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enterBook(formData)
    console.log("Form submitted:", formData);
    // In a real app, you would dispatch an action to add the book here
    alert(`Book "${formData.bookname}" added successfully! (Simulated)`);
    setFormData({ // Reset form after submission
      _id:"",
      bookname: "",
      author:"",
      description: "",
      price: 0,
      publisher: "",
      quantity: 0,
      category:"",
      reviews:[],
      image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fbook-jpg&psig=AOvVaw3MGwFT2fHkxxeR3VdIAX7V&ust=1759550083917000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKjdnoSRh5ADFQAAAAAdAAAAABAE"
    });
    handleCloseModal(); // Close modal after submission
  };

  const categories = Array.from(new Set(data.map((book) => book.category)));

  const filteredBooks = data.filter((book) => {
    const matchesSearch =
      book.bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedFilter === "All" || book.category === selectedFilter;

    const matchesQuantity =
      stockType === "All"
        ? true
        : stockType === "In-stock"
        ? book.quantity > 0
        : book.quantity === 0;

    return matchesSearch && matchesCategory && matchesQuantity;
  });

  

  return (
    <>
      <div className="container-fluid p-4">
        <h2>Inventory Management 📚</h2>
        <p className="text-muted">Monitor and manage your product inventory.</p>

        {/* --- Inventory Summary Cards --- */}
        <div className="row g-3 mb-5">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="carder p-3 shadow-sm bg-light">
              <h5 className="text-primary">Total Items</h5>
              <h3>{data.length}</h3>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="carder p-3 shadow-sm bg-success">
              <h5 className="text-primary">Inventory Value</h5>
              <h3>₹{total}</h3>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="carder p-1 shadow-sm bg-warning text-dark">
              <h5 className="fs-5">Low Stock Alerts ⚠️</h5>
              <h3>{lowStockCount}</h3>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="carder p-3 shadow-sm bg-danger text-white">
              <h5>Out of Stock 🛑</h5>
              <h3>{outOfStockCount}</h3>
            </div>
          </div>
        </div>

        {/* --- Search, Filters & Add Button --- */}
        <div className="carder p-4 shadow-sm mb-5">
          <h4 className="text-muted mb-3">Product Search & Filters</h4>
          <div className="row align-items-end">
            <div className="col-md-6 mb-3">
              <label htmlFor="inventorySearch" className="form-label">Search Books</label>
              <input
                id="inventorySearch"
                type="search"
                className="form-control"
                placeholder="Search by name, category, or publisher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="categoryFilter" className="form-label">Category</label>
              <select
                id="categoryFilter"
                className="form-select"
                onChange={(e) => setSelectedFilter(e.target.value)}
                value={selectedFilter}
              >
                <option value="All">--All Categories--</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="stockFilter" className="form-label">Stock Status</label>
              <select
                id="stockFilter"
                className="form-select"
                onChange={(e) => setStockType(e.target.value)}
                value={stockType}
              >
                <option value="All">All</option>
                <option value="In-stock">In-stock</option>
                <option value="Out-of-stock">Out-of-stock</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-end mt-3">
              <button className="btn btn-danger" onClick={() => setShowModal(true)}>
                ➕ Add New Book
              </button>
            </div>
          </div>
        </div>

        {/* --- Book List --- */}
        <div className="row g-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              // Using book.id as key is better if available, falling back to index
              <div className="col-sm-6 col-md-5 col-lg-4" key={book._id || index}>
                <Carder
                image=""
                  author={book.author}
                  _id={book._id}
                  reviews={book.reviews}
                  bookname={book.bookname}
                  category={book.category}
                  price={book.price}
                  quantity={book.quantity}
                  publisher={book.publisher}
                  description={book.description}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-5">
              <h4 className="text-danger">No books found matching your criteria. 😟</h4>
            </div>
          )}
        </div>

        {/* --- Modal Component (Inline) --- */}
        {showModal && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">Add New Inventory Item</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white" // Added btn-close-white for better visibility
                    aria-label="Close"
                    onClick={handleCloseModal} // Added onClick handler
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {/* Book Name Input */}
                    <div className="mb-3">
                      <label htmlFor="bookname" className="form-label">Book Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bookname"
                        value={formData.bookname}
                        onChange={handleInput}
                        placeholder="Enter book name"
                        required
                      />
                    </div>

                    {/* Description Input */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={formData.description}
                        onChange={handleInput}
                        placeholder="Enter description"
                        required
                      />
                    </div>

                    {/* Price Input */}
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={formData.price}
                        onChange={handleInput}
                        placeholder="Enter price"
                        min="0.01"
                        step="0.01"
                        required
                      />
                    </div>
                    {/* Author Input */}
                     <div className="mb-3">
                      <label htmlFor="author" className="form-label">Author</label>
                      <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={formData.author}
                        onChange={handleInput}
                        placeholder="Enter Author"
                        required
                      />
                    </div>
                    {/* Publisher Input */}
                    <div className="mb-3">
                      <label htmlFor="publisher" className="form-label">Publisher</label>
                      <input
                        type="text"
                        className="form-control"
                        id="publisher"
                        value={formData.publisher}
                        onChange={handleInput}
                        placeholder="Enter publisher"
                        required
                      />
                    </div>
                    {/* Category Input */}
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">Category</label>
                      <select name="category" className="form-select">
                        {
                          categories.map(category=>(
                            <option value={category}>{category}</option>
                          ))
                        }
                      </select>
                    </div>

                    {/* Quantity Input */}
                    <div className="mb-4">
                      <label htmlFor="quantity" className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        value={formData.quantity}
                        onChange={handleInput}
                        placeholder="Enter quantity"
                        min="0"
                        max="100"
                        required
                      />
                    </div>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-danger">
                        Add Book to Inventory
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default InventoryManagement;