import React, { createContext, useState, useEffect } from "react";
import {Students} from "../assets/frontendImages";
import {Teachers} from "../assets/frontendImages";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [menu,setMenu]=useState("");
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );
  const url="http://localhost:5000"
  useEffect(() => {
    
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setToken(storedUser)
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const registerUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
  
    <AuthContext.Provider
      value={{
        url,
        menu,setMenu,
        Students,Teachers,
        profile,
        setProfile,
        user,
        loginUser,
        registerUser,
        logoutUser,
        isAuthenticated: !!user,
        token,setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
