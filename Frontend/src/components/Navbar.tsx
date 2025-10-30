import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContextObj, type UserContextType } from "../Context/UserContext";
import {
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserShield,
  FaSignInAlt,
  FaBoxOpen,
  FaCashRegister,
  FaUser,
} from "react-icons/fa";

function Navbar() {
  const { isLoggedIn, currentUser, logout, isAdmin } = useContext<UserContextType>(userContextObj);
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          📚 BookBazaar
        </NavLink>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-3">
          <li className="nav-item">
            <NavLink className="nav-link" to="">
              <FaHome className="me-1" /> Home
            </NavLink>
          </li>

          {currentUser?.role==='customer' && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="cart">
                  <FaShoppingCart className="me-1" /> Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="checkout">
                  <FaCashRegister className="me-1" /> Checkout
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="orders">
                  <FaBoxOpen className="me-1" /> {currentUser?.username}'s Orders
                </NavLink>
              </li>
            </>
          )}

          {currentUser?.role==='admin' && (
            <li className="nav-item">
              <NavLink className="nav-link" to="admin">
                <FaUserShield className="me-1" /> Admin
              </NavLink>
            </li>
          )}

          {!isLoggedIn && (
            <li className="nav-item">
              <NavLink className="nav-link" to="login">
                <FaSignInAlt className="me-1" /> Login
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li className="nav-item">
              <button
                className="btn btn-outline-light"
                onClick={logoutUser}
                style={{ transition: "all 0.3s ease" }}
              >
                <FaSignOutAlt className="me-1" /> Logout
              </button>
            </li>
          )}
          {isLoggedIn && (
            <NavLink className="nav-link" to="user-profile">
              <FaUser className="me-1" aria-label="User Profile Icon" />
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
