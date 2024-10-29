import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { Divider } from "@tremor/react";
import { FiMoreVertical } from "react-icons/fi";
import PropTypes from "prop-types";
import { NavLink, useOutletContext } from "react-router-dom";
import cx from "classnames";
import { createContext, useContext, useState } from "react";

const SideBarContext = createContext();
export default function GittySideBar({ children }) {
  const { user } = useOutletContext();
  console.log(user);
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="h-screen font-geist text-sm">
      <nav className="h-full flex flex-col bg-brand border-r border-gray-800/50 shadow-sm text-gray-400">
        <div className=" -mb-4 p-2 flex justify-between items-center">
          <h1 className={
            cx(
              "overflow-hidden transition-all font-semibold text-3xl pl-2",
              expanded ? "w-10" : "w-0"
            )
          }>ඞ.</h1>
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg transition-all duration-200">
            {expanded ? <FaArrowLeft size="20" /> : <FaArrowRight size="20" className="mr-3" />}
          </button>
        </div>
        <Divider />
        <SideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SideBarContext.Provider>

        <Divider />
        <div className="-mt-4 flex p-2">
          <img
            src={`https://ui-avatars.com/api/?name=${user.user.username}`}
            className={cx(
              "w-10 h-10 rounded-md ml-1",
            )}
          />
          <div className={cx(
            "flex justify-between items-center overflow-hidden transition-all",
            expanded ? "w-52 ml-3" : "w-0"
          )}>
            <div className="leading-4">
              {/* Put all the user info here */}
              <h4 className="font-semibold">{user.user.username}</h4>
              <span className="text-xs text-gray-600">{user.user.email}</span>
            </div>
            <FiMoreVertical size="20" />
          </div>
        </div>
      </nav>
    </aside >
  )
}

export const SideBarIcon = ({ icon, text = 'tooltip', links, alert }) => {
  const { expanded } = useContext(SideBarContext);
  return (
    <NavLink
      className={({ isActive }) =>
        cx(
          "relative flex items-center group py-2 px-3 my-1 mb-3 font-medium rounded-md cursor-pointer transition-colors duration-300",
          isActive
            ? "bg-blue-500/100 text-white"
            : "rounded-2xl text-gray"
        )
      }
      to={cx(links === "dashboard" ? `/${links}` : `/dashboard/${links}`)}>
      {icon}
      <span className={cx(
        "overflow-hidden transition-all",
        expanded ? "w-52 ml-3" : "w-0"
      )}>
        {text}
      </span>
      {alert && <div className={cx(
        "absolute text-center right-2 w-2 h-2 rounded-full bg-green-400",
        expanded ? "" : "top-2"
      )} />}
      {!expanded && (
        <div className="sidebar-tooltip">
          {text}
        </div>
      )}
    </NavLink>
  );
}

SideBarIcon.propTypes = {
  text: PropTypes.string,
  links: PropTypes.string,
  alert: PropTypes.bool,
  icon: PropTypes.object,
}

GittySideBar.propTypes = {
  children: PropTypes.array.isRequired,
}
