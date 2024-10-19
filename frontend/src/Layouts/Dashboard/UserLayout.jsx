import { NavLink } from "react-router-dom";
export default function UserLayout() {
  return (
    <>
      <div
        className="h-screen grid place-items-center text-white font-inter">
        Hurray!! Welcome to the Users Layout
        <NavLink
          to="/dashboard/"
          className="hover:border-blue-500 transition duration-2 w-72 m-3 pt-2.5 pb-2.5 border border-blue-950 text-current flex gap-4 justify-center rounded-full">
          back
        </NavLink>
      </div>
    </>
  )
}

