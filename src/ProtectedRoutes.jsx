import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/auth";

const ProtectedRoutes = ({ children }) => {
  const { state = {} } = useAuth();

  console.log(state);

  if (!state?.isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoutes;
