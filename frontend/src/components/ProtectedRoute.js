import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { auth } = useAuth();

  if (adminOnly && (!auth.user || auth.role !== 'admin')) {
    return <Navigate to="/login" />;
  }

  return auth.user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
