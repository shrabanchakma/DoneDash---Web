// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading className="w-8 h-8 animate-spin text-[#348293]" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
