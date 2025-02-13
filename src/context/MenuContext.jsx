import { createContext, useEffect, useState } from "react";

export const MenuContext = createContext();
export const MenuContextProvider = (props) => {
  const [menuDetails, setMenuDetails] = useState([]);
  const menu = [
    {
      day: "Monday",
      breakfast: "Pancakes",
      lunch: "Grilled Chicken",
      dinner: "Pasta",
    },
    {
      day: "Tuesday",
      breakfast: "Omelette",
      lunch: "Fried Rice",
      dinner: "Pizza",
    },
    {
      day: "Wednesday",
      breakfast: "Cereal",
      lunch: "Noodles",
      dinner: "Tacos",
    },
    {
      day: "Thursday",
      breakfast: "Toast & Jam",
      lunch: "Salad",
      dinner: "Curry",
    },
    {
      day: "Friday",
      breakfast: "Smoothie",
      lunch: "Burger",
      dinner: "Fish & Chips",
    },
    { day: "Saturday", breakfast: "Bagels", lunch: "Sandwich", dinner: "BBQ" },
    {
      day: "Sunday",
      breakfast: "Waffles",
      lunch: "Roast Chicken",
      dinner: "Soup",
    },
  ];
  useEffect(() => {
    
    
      setMenuDetails(menu);
  }, []);
  const value = { menuDetails, setMenuDetails };
  return (
    <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>
  );
};
