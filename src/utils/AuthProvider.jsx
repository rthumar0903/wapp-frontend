import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = (userToken) => {
    localStorage.setItem("token", userToken);
  };
  const logout = () => {
    localStorage.removeItem("token");
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
