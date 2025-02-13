import React, { useContext, useState } from "react";
import { messLoginAPI } from "../services/all_api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MessContext } from "../context/MessContext";

const MessLoginForm = () => {
  const { loggedMess, setLoggedMess } = useContext(MessContext);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { phoneNumber, password } = formData;
    if (!phoneNumber || !password) {
      toast.info("Please Fill Misssing Fields");
    } else {
      try {
        const result = await messLoginAPI({ phoneNumber, password });
        if (result.status == 200) {
          sessionStorage.setItem("messId", result.data.existingMess._id);
          sessionStorage.setItem("token", result.data.token);
          navigate("/mess-owner");
          setFormData({
            phoneNumber: "",
            password: "",
          });
        } else {
          toast.warn(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Mess Login</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-gray-500 text-center m-3">Are you new in here? <span className="text-red-500 fw-bold" onClick={()=>navigate('/mess-registration')}>Register</span></p>
      <ToastContainer />.
    </div>
  );
};

export default MessLoginForm;
