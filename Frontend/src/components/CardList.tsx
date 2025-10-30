import React, { useContext, useState, type ChangeEvent } from 'react'
import Card from './Card'
import  { bookContextObj } from '../Context/BookContext'
import CartSidebar from './CartSidebar'
function CardList() {
  const{data}=useContext(bookContextObj)
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort,SetSelectedSort]=useState<string>("")
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
  const filteredBooks = data.filter(
    (book) =>
     ( book.bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchTerm.toLowerCase())) &&
       book.quantity > 0
  );
  return (
    <div className='container'>
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
      <div className="row">
        {
          filteredBooks.map(book=>
            <div key={book.id} className='col-sm-5 mb-4'>
             <Card isCart={false} book={book}/>
            </div>
          )
        }
        <div>
          <CartSidebar />
        </div>
      </div>
    </div>
  )
}

export default CardList