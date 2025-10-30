import React, { useContext, useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { userContextObj } from "../Context/UserContext";
import type { Usertype } from "./UserRegistration";
import { useNavigate } from "react-router";
 
function UserDashboard() {
  const { currentUser, getDetails, editUser } = useContext(userContextObj);
  const [updateUser, setUpdateUser] = useState<Usertype | null>(null);
  const [error, setError] = useState<string>("");
  const navigate=useNavigate()
 
  useEffect(() => {
   
    if (currentUser?.username) {
      getDetails(currentUser.username);
      setUpdateUser(currentUser);
    }
  }, [currentUser, getDetails]);
 
  if (!updateUser) {
    return <div>Loading user data...</div>;
  }
 
 
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({
      ...prev!,
      [name]: value
    }));
  }
 
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
   
    // Use optional chaining just in case, though checked by the guard clause
    if (updateUser?.confirmPassword === updateUser?.password) {
      console.log(updateUser);
      // Pass the complete, updated object to the context function
      editUser(updateUser);
      setError("");
      if(window.confirm('updated password successfully')){
        navigate('/')
      }
 
     
    } else {
      setError("Passwords should match");
    }
  }
 
  return (
    <div>
      <div className="container  align-items-center">
      <form className="form-group p-5 shadow w-50 mt-5 mx-auto" onSubmit={handleSubmit}>
        <h3 className="text-center text-info mb-4">👤 User Profile</h3>
        {/* Username - Disabled input can still use currentUser directly */}
        <label htmlFor="username" className="form-label fw-bold">Username</label>
        <input
          type="text"
          name="username"
          className="form-control mb-3"
          value={updateUser.username} // Use updateUser for consistency
          disabled
        />
       
        {/* Email - Bound to updateUser */}
        <label htmlFor="email" className="form-label fw-bold">Email address</label>
        <input
          type="text"
          name="email"
          value={updateUser.email}
          className="form-control mb-3"
          onChange={handleInput}
        />
       
        <label htmlFor="password" className="form-label fw-bold">Password</label>
        <input
          type="text"
          name="password"
          value={updateUser.password}
          className="form-control mb-3"
          onChange={handleInput}
        />
       
        <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm Password</label>
        <input
          type="text"
          name="confirmPassword"
          value={updateUser.confirmPassword}
          className="form-control mb-3"
          onChange={handleInput}
        />
        <small className="text-danger">{error}</small>
        <button className="btn btn-success fw-bold w-50 d-block mt-3">Save</button>
      </form>
      </div>
    </div>
  );
}
 
export default UserDashboard;
 