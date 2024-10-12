import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  // this will help you out in setting up the navbar
  return (
    <header className="z-40 top-0 left-0 right-0 flex justify-center bg-[#0B0C14]/80 fixed before:absolute before:-z-10 before:inset-0 before:backdrop-blur-2xl"
      id="navbar" >
      <nav className="grow flex justify-between border-b mx-5 max-w-[1110px] h-[52px] text-[13px] leading-[100%] text-[#C9D3EE] border-[#727DA1]/15">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold font-inter">ඞitty.</div>
          <div className="hidden md:flex space-x-6 font-inter">
            {/* Use Navlink*/}
            <Link to="#" className="hover:text-blue-600">Platform</Link>
            <Link to="#" className="hover:text-blue-600">Our Work</Link>
            <Link to="#" className="hover:text-blue-600">Pricing</Link>
            <Link to="#" className="hover:text-blue-600">Community</Link>
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white text-sm font-inter px-4 py-2 rounded-lg">
              <NavLink to="/login">Sign up</NavLink></button>
          </div>
        </div>
      </nav>
    </header>
  )
}

