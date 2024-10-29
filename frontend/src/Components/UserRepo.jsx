import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Card, ProgressBar, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import getRepoData from "../Utils/GetRepoData";
import cx from "classnames";
import cleanName, { Tabletitle } from "../Utils/NameUtils";
import { NavLink } from "react-router-dom";


export default function UserRepo({ url }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        setProgress(20);
        const response = await getRepoData(url);
        if (!response || response.length === 0) {
          setError("Unable to retrieve data");
          return;
        }
        setProgress(60);
        console.log(response);
        setData(response);
        setError(null);
        setProgress(100);
      } catch (err) {
        setError("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (isLoading) {
    // Loading state
    return (
      <div className="flex justify-center items-center h-64">
        <ProgressBar
          value={progress}
          className="w-1/2"
          color="blue"
        />
        <Text className="ml-2 text-lg mt-4">Loading data...</Text>
      </div>
    );
  }

  if (error) {
    // Error state
    return (
      <Card className="m-4 p-4">
        <Text color="red" className="text-center text-lg">
          {error}
        </Text>
      </Card>
    );
  }

  if (data.length === 0) {
    // No data case
    return (
      <Card className="m-4 p-4">
        <Text className="text-center text-lg">
          No data available
        </Text>
      </Card>
    );
  }

  return (
    <Table className="m-4 mx-auto rounded font-geist">
      {/* Head section */}
      <TableHead>
        <TableRow >
          {Object.keys(data[0]).map((header, idx) => (
            <TableHeaderCell
              key={idx}
              className={cx("border-b border-blue-800/50 text-lg font-semibold",
                Object.keys(data[0]).length - idx === 2 ? "text-center" : "")}
            >
              {Tabletitle(header)}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      {/* Body section */}
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.url} className="text-gray-500">
            <TableCell>
              <NavLink
                to={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </NavLink>
            </TableCell>
            <TableCell>{item.url}</TableCell>
            <TableCell>{item.language || "Notes"}</TableCell>
            <TableCell>{item.stars}</TableCell>
            <TableCell>{item.visibility}</TableCell>
            <TableCell>
              {item.branch}
            </TableCell>
            <TableCell>{item.size}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

UserRepo.propTypes = {
  url: PropTypes.string.isRequired,
};


