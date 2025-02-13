import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FoodContextProvider } from "./context/FoodContext.jsx";
import { MenuContextProvider } from "./context/MenuContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import {TokenAuthProvider }from "./context/TokenAuth.jsx";
import { MessContextProvider } from "./context/MessContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MessContextProvider>
        <FoodContextProvider>
          <MenuContextProvider>
            <UserContextProvider>
              <CartContextProvider>
                <TokenAuthProvider>
                  
                <App />
                </TokenAuthProvider>
              </CartContextProvider>
            </UserContextProvider>
          </MenuContextProvider>
        </FoodContextProvider>
      </MessContextProvider>
    </BrowserRouter>
  </StrictMode>
);
