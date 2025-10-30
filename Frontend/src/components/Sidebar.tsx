import React from 'react';
import { NavLink } from 'react-router';
import '../styles/Sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar w-75">
      <ul>
        <li className="nav-item">
          <NavLink to="" className="nav-link">Admin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="inventory-management" className="nav-link">Inventory</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="book-management" className="nav-link">Books  </NavLink>
        </li>
        
         <li className="nav-item">
          <NavLink to="reviews" className="nav-link">Review</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to='order-management'>OrderManagement</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;



