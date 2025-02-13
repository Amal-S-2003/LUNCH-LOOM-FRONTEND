import React, {  useEffect, useState } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { getMessData } from "../services/all_api";


function MessOwnerHome() {

 const [messData, setMessData] = useState({});
  const messId = sessionStorage.getItem("messId");

  const fetchMessData = async () => {
    try {
      const result = await getMessData({ messId });
      setMessData(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchMessData();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen">
        <div className="border-b-2 py-4 ">
          <div className="px-5 flex justify-between items-center">
            <NavLink
              to="/mess-owner"
              className="text-3xl flex items-center font-black"
            >
              <span>
                <img className="w-14 h-14" src={assets.logo} alt="" />
              </span>
              <span>LUNCH-LOOM</span>
            </NavLink>
            <div className="flex items-center gap-3">
              <p>
                {" "}
                {messData ? (
                  <p>Welcome <span className="fw-bold fs-3 text-teal-500"> {messData.messName} </span></p>
                ) : (
                  <a
                    className="border-2 px-6 py-1.5 rounded-lg border-blue-600 font-medium text-blue-600 hover:bg-blue-600 hover:text-white btn"
                    onClick={() => navigate("/mess-login")}
                  >
                    Login
                  </a>
                )}
              </p>
              <div className="relative group">
             
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
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
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/mess-owner/dashboard"}
              >
                <p>Dashboard</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/mess-owner/requests"}
              >
                <p>Requests</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/mess-owner/customers"}
              >
                <p>customers</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/mess-owner/view-menu"}
              >
                <p>View Menu</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/mess-owner/edit-menu"}
              >
                <p> Edit Menu</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-blue-100 border-r-4 border-blue-500"
                  }`
                }
                to={"/mess-owner/mess-profile"}
              >
                <p>Profile</p>
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
