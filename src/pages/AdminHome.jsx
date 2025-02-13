import React from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

function MessOwnerHome() {
  const navigate=useNavigate()
  return (
    <>
      <div className="max-h-screen overflow-x-hidden  overflow-y-auto">
        <div className="border-b-2 py-4 ">
          <div className="px-5 flex justify-between items-center">
            <NavLink to="/admin-home" className="text-3xl flex items-center font-black">
              <span>
                <img className="w-14 h-14" src={assets.logo} alt="" />
              </span>
              <span>LUNCH-LOOM</span>
            </NavLink>
            <div className="flex items-center gap-3">
              <div className="relative group">
              <p className="fw-bold btn bg-gray-100">ADMIN</p>
          
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li className="py-1 px-2 cursor-pointer pr-10" onClick={()=>navigate('/')}>Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <div className="inline-block min-h-screen  border-r-2">
            <ul className="flex flex-col items-start pt-5 text-gray-800 w-60 ">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-gray-100 border-r-4 border-gray-500"
                  }`
                }
                to={"/admin-home/dashboard"}
              >
                <p >Dashboard</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-gray-100 border-r-4 border-gray-500"
                  }`
                }
                to={"/admin-home/users"}
              >
                <p >View Users</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-gray-100 border-r-4 border-gray-500"
                  }`
                }
                to={"/admin-home/mess"}
              >
                <p >View Mess</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-gray-100 border-r-4 border-gray-500"
                  }`
                }
                to={"/admin-home/fooditems"}
              >
                <p >fooditems</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-gray-100 border-r-4 border-gray-500"
                  }`
                }
                to={"/admin-home/view-all-orders"}
              >
                <p >All Orders</p>
              </NavLink>
           
            </ul>
          </div>

          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MessOwnerHome;
