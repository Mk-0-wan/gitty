import { useEffect, useState } from "react";
import Joblisting from "./Joblisting";
import PropTypes from "prop-types";

export default function Joblistings({ isHome }) {
  // setting up the database using json-server
  const [jobs, setjobs] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setjobs(data);
      };

      const url = isHome ? "/api/jobs?_limit=3" : "/api/jobs";

      fetchData(url);
    } catch (err) {
      console.error(err);
    } finally {
      setloading(true);
    }
  }, [isHome]);
  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {/*Conditinal Rendering*/}
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 font-geist gap-6">
            {/* The story of keys and map well react requires each element while looping over it to have, a unique key, this will help our in keeping track of the value state.*/}
            {jobs.map((job) => (
              <Joblisting key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Joblistings.propTypes = {
  isHome: PropTypes.string,
};
