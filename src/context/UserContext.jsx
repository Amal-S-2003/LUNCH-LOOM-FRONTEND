import { createContext, useEffect, useState } from "react";
import { getAllUsers, getUserData } from "../services/all_api";

export const UserContext = createContext();
export const UserContextProvider = (props) => {
  const [userId, setUserId] = useState();
  const [userLogged,setUserLogged]=useState(false)
  const [loggedUserData, setLoggedUserData] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const fetchAllUsers = async() => {
      const result =await  getAllUsers();
      console.log(result);
      setAllUsers(result.data);
    };
 
  const fetchLoggedUserData = async (userId) => {    
    const result = await getUserData({userId});
    if(userId){

      setUserLogged(true)
    }
    setLoggedUserData(result.data)
  };

  useEffect(() => {    
    setUserId(sessionStorage.getItem("userId"))
    // log
    fetchLoggedUserData(userId);
    fetchAllUsers();
  }, [userId,userLogged]);

  const value = { userId, setUserId,loggedUserData, setLoggedUserData,userLogged,setUserLogged ,allUsers, setAllUsers};
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
