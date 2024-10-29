import { useEffect, useState } from "react";
import cx from "classnames";
import axios from "axios";
import cleanName from "../Utils/NameUtils";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";

const GrabUsers = ({ url }) => {
  const [hotRepos, setHotRepos] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(url);
      setHotRepos(response.data)
    }
    fetch();
  }, [url]);

  return (
    <>
      {hotRepos.map((repo, idx) => (
        (idx < 8 &&
          < div key={idx} className="grid grid-cols-1 gap-1 py-[0.115em] w-full flex-grow px-0 " >
            <div
              className={cx(
                `flex items-center   -mb-2 shadow-xl px-2
                          bg-gray-800/20 hover:bg-blue-500/20 hover:rounded-lg transition duration-300 ease-in-out hover:scale-105`
              )}>
              <img
                src={repo.avatar}
                alt={`${repo.github_name}'s avatar`}
                className="rounded-full w-10 h-10 border-2 border-blue-300/20"
              />
              <div className="pl-2 flex flex-col text-left">
                <span className="text-[16px] font-semibold">@{cleanName(repo.github_name, 1) || repo.name}</span>
                <span className="text-[16px]">
                  <NavLink
                    to={`https://github.com${repo.popular.repo}`}
                    className="hover:underline text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer">
                    {cleanName(repo.popular.repo, 2)}
                  </NavLink>
                </span>
              </div>
            </div>
          </div >
        )
      ))}
    </>
  )
}

GrabUsers.propTypes = {
  url: PropTypes.string.isRequired,
}

export default GrabUsers;
