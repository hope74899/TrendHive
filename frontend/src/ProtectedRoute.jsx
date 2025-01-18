import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthToken";


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { token, user } = useAuth(); // Ensure role and token come from your auth logic

  // If no token or the user doesn't have the required role, redirect
  if (!token || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Render the child components if the role matches
  return children;
};

export default ProtectedRoute;
