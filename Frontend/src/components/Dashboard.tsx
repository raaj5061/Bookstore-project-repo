import React, { useContext } from 'react'
import  { userContextObj } from '../Context/UserContext'
import '../styles/Dashboard.css'
import { bookContextObj } from '../Context/BookContext'
import { orderContextObj } from '../Context/OrderContext'
function Dashboard() {
    const {currentUser}=useContext(userContextObj)
    const{orders}= useContext(orderContextObj)
    const {data}=useContext(bookContextObj)
    const lowStockCount = data.filter((book) => book.quantity > 0 && book.quantity <= 30).length;
    const outOfStockCount = data.filter((book) => book.quantity === 0).length;
   let total = 0;
   orders.forEach(order =>total+=
  order.items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
);

    
  return (
     <div>
      <>
      <h1>Hello {currentUser?.username}</h1>
        <h3>Current inventory standings are :</h3>
      </>
      <div className="container">
        <div className="row g-2">
      <div className='carder col-sm-3'>
        <h5>Total Orders</h5>
        <h4>{orders.length}</h4>
      </div>
      
      <div className='carder col-sm-3'>
        <h5>Revenue</h5>
        <h4>₹{total}</h4>
      </div>
      
      <div className='carder col-sm-3 bg-warning'>
        <h5>Low Stock Items</h5>
        <h4>{lowStockCount}</h4>
      </div>
      
      <div className='carder col-sm-3 bg-primary'>
        <h5>Active products</h5>
        <h4>{data.length-outOfStockCount}</h4>
      </div>
      </div>
      </div>
      <div className="container mt-3 mb-4">
        <div className="row g-2">
          <div className="carder col-sm-5 p-5">
            <h3>Sales by Category</h3>
            <p className='text-muted'>Distribution of sales by each category</p>
          </div>
          <div className="carder col-sm-5 p-5">
            <h3>Stock depletion vs Restocking</h3>
            <p className='text-muted'>Monthly comparision of inventory movements</p>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="carder col-sm-11">
            <h4>Recent activity</h4>
            <p className="text-muted">Recent activity from your store</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard