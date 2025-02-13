import React, { createContext, useEffect, useState } from "react";
export const TokenAuthContext = createContext();

  export const TokenAuthProvider = (props) => {

  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);
  const value={isAuthorized, setIsAuthorized}
  return (
    <>
      <TokenAuthContext.Provider value={value}>
        {props.children}
      </TokenAuthContext.Provider>
    </>
  );
}

export default TokenAuthProvider;
