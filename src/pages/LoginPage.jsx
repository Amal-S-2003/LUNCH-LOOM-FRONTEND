import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/all_api";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(UserContext);
  const { loggedUserData, setLoggedUserData ,userLogged,setUserLogged} = useContext(UserContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    const { phone, password } = loginData;
    if (!phone || !password) {
      toast.info("Please Fill Misssing Fields");
    } else {
      try {
        const result = await loginApi({ phone, password });
        if (result.status == 200) {
          sessionStorage.setItem("userId", result.data.existingUser._id);
          sessionStorage.setItem("token", result.data.token);
          setUserId(result.data.existingUser._id);
          setLoginData({
            phone: "",
            password: "",
          });
          setUserLogged(true)
         await navigate("/");

        } else {
          toast.warn(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <div className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              onChange={(e) =>
                setLoginData({ ...loginData, phone: e.target.value })
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

export default LoginPage;
