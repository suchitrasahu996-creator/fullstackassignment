import React from "react";
import {Navigate } from "react-router-dom";
import {useAuth } from "@/context/AuthContext";
import {Loader2} from "lucide-react";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user
    ? children
    : <Navigate to="/login" replace />;
};
export default ProtectedRoute;