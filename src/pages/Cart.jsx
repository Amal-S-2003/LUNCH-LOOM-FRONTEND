import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateCart } from "../services/all_api";
import { server_url } from "../services/server_url";
import { CartContext } from "../context/CartContext";

function Cart() {
  const [userId] = useState(sessionStorage.getItem("userId"));
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const {navCart,setNavCart}=useContext(CartContext)
  const navigate = useNavigate();

  const fetchCartData = async () => {
    try {
      const result = await getUserData({ userId });
      const fetchedCartData = result.data[0].cart;
      setCartItems(fetchedCartData);
      calculateTotalPrice(fetchedCartData);
      console.log("Fetched cart data:", fetchedCartData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateCartItems = async () => {
    setNavCart(!navCart)
    const reqBody = {
      userId,
      cartItems,
    };
    try {
      await updateCart(reqBody);
      console.log("Cart updated successfully.");
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [userId]);

  useEffect(() => {
    if (cartItems.length > 0) {
      updateCartItems();
    }
  }, [cartItems]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotalPrice(total);
  };

  const updateQuantity = (foodId, qtyChange) => {
    const updatedCart = cartItems.map((item) =>
      item.foodId === foodId
        ? { ...item, qty: Math.max(item.qty + qtyChange, 1) }
        : item
    );
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const removeItem = (foodId) => {
    const updatedCart = cartItems.filter((item) => item.foodId !== foodId);
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const proceedToCheckout = async () => {
    try {
      const reqBody = {
        userId,
        cartItems,
      };
      await updateCart(reqBody);
      navigate("/order");
    } catch (error) {
      console.error("Error proceeding to checkout:", error);
    }
  };

  return (
    <div className="flex container">
      {cartItems?.length > 0 ? (
        <div className="mx-auto p-6 w-3/5">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          <div className="grid gap-4">
            {cartItems.map((item) => (
              <div
                key={item.foodId}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
              >
                <img
                  src={`${server_url}/uploads/${item.foodImage}`}
                  alt={item.foodName}
                  className="w-16 h-16 rounded-lg"
                />

                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{item.foodName}</h2>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.foodId, -1)}
                    className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="px-4">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.foodId, 1)}
                    className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.foodId)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-200 p-4 rounded-lg shadow flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
            <button
              onClick={proceedToCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col items-center p-6 w-3/5">
          <h1 className="fw-bold text-4xl text-center mt-24">
            Your cart is Empty
          </h1>
          <button
            onClick={() => navigate("/foods")}
            className="bg-slate-500 mt-5 rounded-lg px-5 fw-medium text-white py-2"
          >
            Explore...
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
