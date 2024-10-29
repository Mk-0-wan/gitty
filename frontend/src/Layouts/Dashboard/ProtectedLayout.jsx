import { isAuthenticated } from "../../Utils/Data";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login", { state: { from: location } });
  }, [navigate, location]);
  return (isAuthenticated() ? <Outlet /> : null);
}


