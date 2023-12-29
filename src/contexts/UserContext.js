import { createContext, useEffect, useState } from "react";
import { AppProps } from "../commom/AppProps";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem(AppProps.CURRENT_USER));
    setUser(result);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;