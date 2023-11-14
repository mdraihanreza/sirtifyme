
import { Navigate, useLocation } from "react-router-dom";
import React from "react";



export const RequireAuth = ({ children }) => {
 
  const admintoken = localStorage.getItem("admintoken")
  const location = useLocation();

  if (!admintoken) {
    return <Navigate to="/admin/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export const RequireAuthLogout = ({ children }) => {
  const admintoken = localStorage.getItem("admintoken");
  const location = useLocation();

  if (admintoken) {
    return <Navigate to="/admin" state={{ path: location.pathname }} />;
  }
  return children;
};

