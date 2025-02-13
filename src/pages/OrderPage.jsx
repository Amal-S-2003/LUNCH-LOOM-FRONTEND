import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, placeOrder, updateCart } from "../services/all_api";
import { UserContext } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";

function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { loggedUserData, setLoggedUserData } = useContext(UserContext);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const { name, phone, address } = loggedUserData[0];
  console.log(name, phone, address);

  const navigate = useNavigate();
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotalPrice(total);
  };

  const fetchCartData = async () => {
    try {
      const result = await getUserData({ userId });
      setCartItems(result.data[0].cart);
      console.log(result.data[0].cart);
      console.log(cartItems);
      
      
      calculateTotalPrice(result.data[0].cart);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    console.log("loggedUserData", loggedUserData);

    fetchCartData();
  }, []);

  const handlePlaceOrder = async () => {
    const orderDetails = {
      userId,
      name,
      phone,
      address,
      paymentMethod,
      orderItems:cartItems,
      totalPrice,
    };
    const result = await placeOrder(orderDetails);
    if (result.status == 200) {
      toast.success(result.data);
      const reqBody = {
        userId,
        cartItems:[],
      };
      const updatedCart = await updateCart(reqBody);
      navigate("/");
    } else {
      toast.warn(result.data);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Delivery Address */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
        <textarea
          value={address}
          placeholder="Enter your delivery address"
          className="w-full p-2 border rounded-lg"
          rows="4"
          required
          disabled
        />
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Cash on Delivery (COD)
          </label>
          {/* <label>
            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Credit/Debit Card
          </label> */}
          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            UPI
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          {cartItems.map((item) => (
            <div
              key={item.foodId}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.foodName} (x{item.qty})
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Confirm Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Place Order
      </button>
      <ToastContainer />
    </div>
  );
}

export default OrderPage;
