import React, { useContext } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import '../styles/Admin.css'


function Admin() {
  return (
    <div className="row g-0">
      <div className="col-sm-4 col-md-6 col-lg-4 inner">
        <Sidebar />
      </div>
      <div className="col-sm-8  col-md-6 col-lg-8 outer">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
