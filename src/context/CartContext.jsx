import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cartCount, setCartCount] = useState(1);
  const [navCart, setNavCart] = useState(true);
  const value = {
    cartCount,
    setCartCount,
    navCart, setNavCart
  };
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
