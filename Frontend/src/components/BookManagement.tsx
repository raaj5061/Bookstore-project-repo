import React, { useContext, useState, type ChangeEvent } from 'react'
import { bookContextObj } from '../Context/BookContext'
import EditCard from './EditCard'
function BookManagement() {
  const {data}=useContext(bookContextObj)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort,SetSelectedSort]=useState<string>("")
  const filteredBooks = data.filter(
    (book) =>
      book.bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
   function handleInput(e:ChangeEvent<HTMLSelectElement>){
      const{value}=e.target;
      SetSelectedSort(value)
    }
   if(selectedSort==="high"){
    data.sort((a,b)=>a.price-b.price)
  } 
  else if(selectedSort==="low"){
    data.sort((a,b)=>b.price-a.price)
  }
  return (
    <div className="container">
      <select name="" className='form-select w-25 my-2' value={selectedSort} onChange={handleInput}>
        <option value="">Sort</option>
        <option value="low">Sort by Price high-low</option>
        <option value="high">Sort by low to high</option>
      </select>
      <div className="container mb-5 mt-5">
        <div className="carder col-sm-10">
          <h3 className="text-muted">Product Search & Filters</h3>
          <input
            type="search"
            className="form-control"
            name=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    <div className='row mb-5'>
    {
    filteredBooks.length > 0 ? (
      filteredBooks.map((book,idx) => (
        <div className="col-sm-6 col-md-5 col-lg-5" key={idx}>
            <EditCard  book={book}/>
        </div>
      ))): (
      <div className="col-sm-12 text-center mt-4">
        <h4 className="text-danger">No books found matching your search.</h4>
      </div>
    )}
      </div>
    </div>
  )
}

export default BookManagement