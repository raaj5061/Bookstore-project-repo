import React, { useContext } from 'react';
import '../styles/Carder.css'
import type{ BookType } from './Card';
import { bookContextObj } from '../Context/BookContext';
import { LuBookType } from 'react-icons/lu';
const style=` .progress-bar {
    height: 100%;
    background-color: #28a745;
    border-radius: 50px;
    transition: width 0.4s ease-in-out;
  }`
function Carder(props: BookType) {
  const{editBook}=useContext(bookContextObj)
  // Calculate the progress bar width based on the quantity
  function addInventory(book:BookType){
    editBook({...book,quantity:book.quantity+10})
  }
  const progressBarWidth = `${(props.quantity / 100) * 100}%`;

  return (
    <>
    <style>{style}</style>
      <div className='carder-container'>
        <h4>{props.bookname}</h4>
        <p className="text-muted">{props.category}</p>
        {
          props.quantity===0?<div className='badge2'>out of stock</div>:<div className='badge'>In stock</div>
        }

        <div className="stock-info">
          Stock level: {props.quantity}/100
        </div>
        
        {/* Progress Bar Implementation */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{width:progressBarWidth}}></div>
        </div>
        <div className="row">
          <div className="col-sm-6">
        <h3>Price</h3>
        <p>{props.price}</p>
        </div>
        <div className="col-sm-6">
          <h3>Quantity</h3>
          <button className="btn btn-success" onClick={()=>{addInventory(props)}}>Add 10</button>
        </div>
        </div>
        <h3>Publisher</h3>
        <p>{props.publisher}</p>
      </div>
      
    </>
  );
}

export default Carder;