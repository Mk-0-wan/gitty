import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { loading, user } = useAuth();
  console.log(user);
  // Check if the token exists
  if (!token) {
    return <Navigate to="/login" />;
  }
  // Optionally, you could verify the token by making an API call to check if it's still valid
  if (loading) {
    // Make or use some custom loading component
    return <div>Loading...</div>;
  }

  return <Outlet context={{ user }} />; // Renders the child routes (i.e., dashboard, etc.)
};

export default ProtectedRoute;
