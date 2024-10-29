import { Outlet, useOutletContext } from "react-router-dom";
import GittySideBar, { SideBarIcon } from "../../Components/GittySideBar";
import { MdLogout } from "react-icons/md";
import { FaCreditCard, FaGithub, FaGithubAlt } from "react-icons/fa"

export default function DashLayout() {
  const links = [
    {
      link: "dash",
      icon: <FaGithub size="20" />,
      text: "Dashboards",
      alert: true,
    },
    {
      link: "repo",
      icon: <FaGithubAlt size="20" />,
      text: "Repositories",
      alert: false,
    },
    {
      link: "create-repo",
      icon: <FaCreditCard size="20" />,
      text: "Create",
      alert: true,
    },
    {
      link: "user",
      icon: <FaGithubAlt size="20" />,
      text: "UserInfo",
      alert: false,
    },
    {
      link: "log-out",
      icon: <MdLogout size="20" />,
      text: "Logout",
      alert: true,
    },
  ]
  const { user } = useOutletContext();
  return (
    <>
      <div className="flex h-screen">
        <GittySideBar className="transition-all duration-100">
          {links.map((link, idx) => (
            <SideBarIcon key={idx} icon={link.icon} text={link.text} links={link.link} alert={link.alert} />
          ))}
        </GittySideBar>
        <div className="flex-1 overflow-auto">
          <Outlet context={{ user }} />
        </div>
      </div>
    </>
  )
}

