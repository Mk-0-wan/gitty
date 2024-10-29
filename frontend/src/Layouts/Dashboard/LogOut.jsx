import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

export default function LogOut() {
  const { logout } = useAuth();
  return (
    <>
      <NavLink
        to="/"
        onClick={logout}
        className="hover:border-blue-500 transition duration-2 w-72 m-3 pt-2.5 pb-2.5 border border-blue-950 text-current flex gap-4 justify-center rounded-full"
      >
        Click Me
      </NavLink>
    </>
  );
}
