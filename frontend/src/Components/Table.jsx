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


export default function RepoTable({ url }) {
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
          <TableRow key={item.repo} className="text-gray-500">
            <TableCell>
              <NavLink
                to={`https://github.com/${item.repo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cleanName(item.repo, 2)}
              </NavLink>
            </TableCell>
            <TableCell>{item.desc.substring(0, 20) + "..."}</TableCell>
            <TableCell>{item.lang || "Notes"}</TableCell>
            <TableCell>{item.stars}</TableCell>
            <TableCell>{item.forks}</TableCell>
            <TableCell>
              <div className="flex gap-2 justify-center w-max-[110px]">
                {item.build_by.map((avatar, idx) => (
                  <div key={idx} className="w-[50px] h-[50px] rounded-full overflow-hidden flex">
                    <img
                      className="w-[100%] h-[100%] object-cover"
                      src={avatar.avatar}
                      alt={avatar.by}
                    />
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>{item.change}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

RepoTable.propTypes = {
  url: PropTypes.string.isRequired,
};
