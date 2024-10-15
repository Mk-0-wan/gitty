import { NavLink } from "react-router-dom";

export default function LogginLayout() {
  return (
    <div className="text-xl test-white font-inter  bg-white text-center">
      <NavLink to="/">Back to home page</NavLink>
      <p>Hurray!! this is the LogginLayout</p>
    </div>
  );
}

