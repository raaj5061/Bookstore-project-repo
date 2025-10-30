import React, { useContext } from "react";
import { orderContextObj } from "../Context/OrderContext";
import { userContextObj } from "../Context/UserContext";
import CreditCard from "./CreditCard"; // Assuming CreditCard is the component with the new look

function Orders() {
  const { orders } = useContext(orderContextObj); // Removed getOrders as it's not used here
  const { currentUser } = useContext(userContextObj);

  // Filter orders for the current user
  let userOrders = orders.filter(order => order.username === currentUser?.username);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Orders</h2>

      {userOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        userOrders.map((order) => (
          <div key={order.id} className="card mb-4 shadow-sm">
            <div >
              {/* --- Order Header --- */}
              <h5 className="card-title">Order ID: {order.id}</h5>
              <p className="card-subtitle mb-2 text-muted">
                Placed by: <strong>{order.username}</strong> <br />
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              
              <hr />

              {/* --- Shipping Details --- */}
              <h6>Shipping Address:</h6>
              <p>
                {order.shippingAddress.type} - {order.shippingAddress.street},<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.zipCode}
              </p>
              
              <hr />

              {/* --- Items List --- */}
              <h6>Items:</h6>
              <ul className="list-group mb-3">
                {order.items.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{item.bookname}</strong> — Qty: {item.quantity}, Price: ₹{item.price}, Total : ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <hr />

              {/* --- Payment Details --- */}
              <h6>Payment Method:</h6>
              <p>{order.paymentMethod}</p>

              {order.paymentMethod === "credit" && (
                <div className="py-2">
                  <h6 className="mb-3">Card Details:</h6>
                  
                  {/* The CreditCard component is now responsible for the full visual display */}
                  <div className="d-flex justify-content-center justify-content-md-start">
                   
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;