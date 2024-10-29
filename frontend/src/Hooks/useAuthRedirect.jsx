import { useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";


/// fix the navigate error message
// start here
// TODO: Start here
const AuthRedirect = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token") || localStorage.getItem('token');

    if (token) {
      window.history.replaceState({}, document.title, "/dashboard");
      handleLogin(token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, handleLogin]);

  return null;
};

export default AuthRedirect;

