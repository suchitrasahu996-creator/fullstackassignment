import React from "react";
import {Navigate } from "react-router-dom";
import {useAuth } from "@/context/AuthContext";
import {Loader2} from "lucide-react";


const ProtectedRoute = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) return <div>
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>;

  return user
    ? children
    : <Navigate to="/login" replace />;
};
export default ProtectedRoute;