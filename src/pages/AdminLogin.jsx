import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      toast.info("Please Fill Misssing Fields");
    } else {
      try {
        if (email == "admin@gmail.com" && password == "admin") {
          toast.success("Login Successfull");
          await navigate("/admin-home");
        } else {
            toast.warn("email or password is wrong!!")
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Admin Login</h2>
        <div className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email "
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
