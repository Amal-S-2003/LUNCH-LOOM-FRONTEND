import { useEffect, useState } from "react";
import { createContext } from "react";
import { getAllFoods } from "../services/all_api";

export const FoodContext = createContext();
export const FoodContextProvider = (props) => {
    const [allFoodItems, setAllFoodItems] = useState([]);

    const fetchAllFoods=async()=>{
      const result=await getAllFoods();
      setAllFoodItems(result.data)
    }
    useEffect(() => {
    
        fetchAllFoods();
      }, []);


//     {
//       foodName: "Margherita Pizza",
//       imageUrl: "https://images.unsplash.com/photo-1594007658925-1e6c3a1c89d7",
//       Price: 350
//     },
//     {
//       foodName: "Cheeseburger",
//       imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349",
//       Price: 250
//     },
//     {
//       foodName: "Pasta Alfredo",
//       imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
//       Price: 300
//     },
//     {
//       foodName: "Sushi Platter",
//       imageUrl: "https://images.unsplash.com/photo-1562967914-da4c4b47c2c1",
//       Price: 500
//     },
//     {
//       foodName: "Tacos",
//       imageUrl: "https://images.unsplash.com/photo-1541544181271-7c4b6396a334",
//       Price: 180
//     },
//     {
//       foodName: "Caesar Salad",
//       imageUrl: "https://images.unsplash.com/photo-1575320181284-23f24f79f39d",
//       Price: 150
//     },
//     {
//       foodName: "Chicken Biryani",
//       imageUrl: "https://images.unsplash.com/photo-1602288637787-dcedc2d7a874",
//       Price: 400
//     },
//     {
//       foodName: "Vegetable Stir-fry",
//       imageUrl: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b",
//       Price: 200
//     },
//     {
//       foodName: "Chocolate Cake",
//       imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
//       Price: 150
//     },
//     {
//       foodName: "Paneer Butter Masala",
//       imageUrl: "https://images.unsplash.com/photo-1592841943661-2da6c8cb18b6",
//       Price: 320
//     },
//     {
//       foodName: "Ice Cream Sundae",
//       imageUrl: "https://images.unsplash.com/photo-1576849644235-f8d6a127e436",
//       Price: 120
//     },
//     {
//       foodName: "French Fries",
//       imageUrl: "https://images.unsplash.com/photo-1547592167-78c4b1e7e307",
//       Price: 90
//     },
//     {
//       foodName: "Grilled Sandwich",
//       imageUrl: "https://images.unsplash.com/photo-1589652717521-34cc4c998ede",
//       Price: 160
//     },
//     {
//       foodName: "Butter Chicken",
//       imageUrl: "https://images.unsplash.com/photo-1602288653316-83d0b9df31f5",
//       Price: 420
//     },
//     {
//       foodName: "Fish Curry",
//       imageUrl: "https://images.unsplash.com/photo-1612874740715-ea03434e0b29",
//       Price: 380
//     },
//     {
//       foodName: "Garlic Bread",
//       imageUrl: "https://images.unsplash.com/photo-1574672288853-d7c0da3be261",
//       Price: 110
//     },
//     {
//       foodName: "Spring Rolls",
//       imageUrl: "https://images.unsplash.com/photo-1584713895873-1dd1d91fddd1",
//       Price: 140
//     },
//     {
//       foodName: "Pancakes",
//       imageUrl: "https://images.unsplash.com/photo-1512058564366-c9e8e2aeca5c",
//       Price: 180
//     },
//     {
//       foodName: "Fried Rice",
//       imageUrl: "https://images.unsplash.com/photo-1611174076638-11b16ef7dbb3",
//       Price: 210
//     },
//     {
//       foodName: "Mango Smoothie",
//       imageUrl: "https://images.unsplash.com/photo-1570542079329-ef6ee252e26e",
//       Price: 130
//     }
//   ];
  
  const value = {
    allFoodItems,
    fetchAllFoods
  };
  return (
    <FoodContext.Provider value={value}>{props.children}</FoodContext.Provider>
  );
};
