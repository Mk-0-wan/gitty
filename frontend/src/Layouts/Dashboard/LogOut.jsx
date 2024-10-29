import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/", { state: { from: location } })
  }, [navigate, location]);
  return;
}

