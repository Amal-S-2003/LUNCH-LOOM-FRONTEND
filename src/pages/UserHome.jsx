import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function UserHome() {
  return (
    <>
      {/* <div>
        
        <NavLink to={'/foods'}>Food</NavLink>
        <NavLink to={'/cart'}>Cart</NavLink>
        <NavLink to={'/profile'}>Profile</NavLink>
    </div> */}
      <Navbar />
      <div className="mt-24">
        <Outlet />
      </div>
    </>
  );
}

export default UserHome;
