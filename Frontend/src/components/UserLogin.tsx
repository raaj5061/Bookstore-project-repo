import React, { useContext, useEffect, useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContextObj } from "../Context/UserContext";
 
const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [success, setSuccess] = useState("");
 
  const { login, currentUser, err, isLoggedIn, SetIsAdmin } = useContext(userContextObj);
  
  const [error, setError] = useState(err);
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
 
    try {
      const res = await login(username, password);
      if (res) {
        setSuccess("Login successful!");
        setError("");
      } else {
        setError(err);
        setSuccess("");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Error during login. Please try again.");
      setSuccess("");
    }
  };
 
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      if (currentUser.role === "admin") {
        SetIsAdmin(true);
        navigate("/admin");
      } else {
        SetIsAdmin(false);
        navigate("/"); // or any other user route
      }
    }
  }, [currentUser, isLoggedIn, navigate, SetIsAdmin]);
 
  return (
    <div className="container p-4 mt-5 text-center">
       <h3 className="text-center mb-4 text-dark">🔐 Sign in to Your Account</h3>
      <form onSubmit={handleLogin} className="form w-50 mx-auto mt-4">
        <div className="mb-3 input-group">
          <label htmlFor="username" className="form-label  fw-semibold me-3">Username</label>
          <span className="input-group-text ">👤</span>
          <input
            id="username"
            type="text"
            value={username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />
        </div>
        <div className="mb-3  input-group">
          <label className="form-label fw-semibold me-3">Password</label>
          <span className="input-group-text ">🔒</span>
          <input
            id="password"
            type="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-warning w-50 fw-bold">Login</button>
        {error && <p className="text-danger mt-3">{error}</p>}
        {success && <p className="text-success mt-3">{success}</p>}
      </form>
      <div className="text-center mt-3">
          <NavLink to="/registration" className="text-decoration-none text-primary">
            📝 New here? Create an account
          </NavLink>
        </div>
    </div>
  );
};
 
export default UserLogin;