import { createContext, useEffect, useState } from "react";
import { getAllMesses, getMessDetails } from "../services/all_api";

export const MessContext = createContext();
export const MessContextProvider = (props) => {
  const [allMesses, setAllMesses] = useState([]);
  const fetchAllMesses = async() => {
    const result =await  getAllMesses();
    console.log(result);
    setAllMesses(result.data);
  };
  useEffect(() => {
    fetchAllMesses();
  }, []);
  const value = {
    allMesses,
    setAllMesses,
  };
  return (
    <MessContext.Provider value={value}>{props.children}</MessContext.Provider>
  );
};
