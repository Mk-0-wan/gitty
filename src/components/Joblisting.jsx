import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarker } from "react-icons/fa";

export default function Joblisting({ job }) {
  // the concept of useState ->" Allows you to set up a new value with it's own specific setter func"
  const [showMore, setShowMore] = useState(false);
  // Get the job description
  let description = job.description;

  // check the state of the state variable (showMore) by default the value is always false
  if (!showMore) {
    description = description.substring(0, 90) + "...";
  }
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{job.type}</div>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>
        {/*the Button below will affect the description value*/}
        <div className="mb-5">{description}</div>
        <button
          className="text-indigo-500 hover:text-indigo-800 mb-2"
          /* Change the values with the help of an event, make a callback to the setter func*/
          onClick={() => setShowMore((prevState) => !prevState)}
        >
          {showMore ? "Less" : "More"}
        </button>
        <h3 className="text-indigo-500 mb-2">{job.salary}</h3>
        <div className="border border-gray-100 mb-5"></div>
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <FaMapMarker className="mb-2 text-lg" />
            {job.location}
          </div>
          <Link
            to={`jobs/${job.id}`}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

// Another thing to keep in mind is the story of how to manage all your props,
// expected types of your props, crucial to your understanding of the codebase
Joblisting.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string,
    salary: PropTypes.string,
    location: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
