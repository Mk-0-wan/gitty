// you will need to make a request to get the trending repos
// also learn how to implement your own table
// make it more unique
// provide a is loading state
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const cleanName = (str) => {
  const newStr = str.split("/")[1];
  return newStr;

}
export default function ApiUtil({ url, title = "Repositories", category }) {
  const [hotRepos, setHotRepos] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(url);
      setHotRepos(response.data)
    }
    fetch();
  }, [url]);
  console.log(hotRepos)
  return (
    <div className="flex flex-grow flex-col gap-2 font-inconsolata text-green-500">
      <div className="my-2 pb-3 border-b border-gray-500/20">
        <h1 className="font-extrabold text-xl leading-3 mt-2 px-4 py-2">Trending {title}</h1>
      </div>
      <div className="flex-1 px-4">{
        hotRepos.map((repo, idx) => (
          (idx < 10
            ?
            <div key={repo.name} className="border-y border-green-500/20 flex space-y-4">
              {/* Come back when you have finished caching the data */}
              <p className="p-1">
                {category ? cleanName(repo.repo) : repo.name}
              </p>
            </div>
            : ""
          )
        ))
      }</div>
    </div>
  );
}

ApiUtil.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  category: PropTypes.bool,
}
