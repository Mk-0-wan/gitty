import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Mainlayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
