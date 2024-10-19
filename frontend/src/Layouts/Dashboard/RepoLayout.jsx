import { NavLink } from "react-router-dom";
import cx from "classnames";
import { PropTypes } from "prop-types";
import { Badge, badgeVariants } from "../../Utils/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { ToastProvider } from "../../Utils/CustomToast";
import { useToast } from '../../Utils/CustomToast';

const MyComponent = () => {
  const { addToast } = useToast();

  const handleSuccessToast = () => {
    addToast({
      variant: 'success',
      title: 'Success',
      description: 'Your action was successful.',
      actionLabel: 'Undo',
      onActionClick: () => alert('Undo clicked!'),
    });
  };
  const handleInfoToast = () => {
    addToast({
      variant: 'info',
      title: 'Info',
      description: 'Just to let you know lock in real quick!',
      autoDismiss: true, // Will stay until dismissed
    });
  };

  const handleErrorToast = () => {
    addToast({
      variant: 'error',
      title: 'Error',
      description: 'Something went wrong.',
      autoDismiss: false, // Will stay until dismissed
    });
  };

  const handleWarningToast = () => {
    addToast({
      variant: 'warning',
      title: 'Warning...',
      description: 'Something is bad is about to happen.',
      autoDismiss: true, // Will stay until dismissed
    });
  };

  const handleLoadingToast = () => {
    addToast({
      variant: 'loading',
      title: 'Loading',
      description: 'Something is loading.',
      autoDismiss: true, // Will stay until dismissed
    });
  };
  return (
    <div>
      <button onClick={handleSuccessToast} className="hover:border-blue-500 transition duration-2 w-72 m-3 pt-2.5 pb-2.5 border
          border-blue-950 text-current flex gap-4 justify-center rounded-full
          font-geist-mono">Show Success Toast</button>
      <button onClick={handleErrorToast} className="hover:border-blue-500 transition duration-2 w-72 m-3 pt-2.5 pb-2.5 border
          border-blue-950 text-current flex gap-4 justify-center rounded-full
          font-geist-mono">Show Error Toast</button>
      <button onClick={handleLoadingToast} className="hover:border-blue-500 transition text-purple-500 duration-2 w-72 m-3 pt-2.5 pb-2.5 border
          border-blue-950 text-current flex gap-4 justify-center rounded-full
          font-geist-mono">loading</button>
      <button onClick={handleInfoToast} className="transition text-purple-500 duration-2 w-72 m-3 pt-2.5 pb-2.5 border
          border-blue-950 text-current flex gap-4 justify-center rounded-full
          font-geist-mono">Info</button>
      <button onClick={handleWarningToast} className="hover:border-blue-500 transition text-purple-500 duration-2 w-72 m-3 pt-2.5 pb-2.5 border
          border-blue-950 text-current flex gap-4 justify-center rounded-full
          font-geist-mono">Warning</button>
    </div>
  );
};

const data = [
  {
    workspace: "sales_by_day_api",
    owner: "John Doe",
    status: "Live",
    costs: "$3,509.00",
    region: "US-West 1",
    capacity: "99%",
    lastEdited: "23/09/2023 13:00",
  },
  {
    workspace: "marketing_campaign",
    owner: "Jane Smith",
    status: "Live",
    costs: "$5,720.00",
    region: "US-East 2",
    capacity: "80%",
    lastEdited: "22/09/2023 10:45",
  },
  {
    workspace: "test_environment",
    owner: "David Clark",
    status: "Inactive",
    costs: "$800.00",
    region: "EU-Central 1",
    capacity: "40%",
    lastEdited: "25/09/2023 16:20",
  },
  {
    workspace: "sales_campaign",
    owner: "Jane Smith",
    status: "Live",
    costs: "$5,720.00",
    region: "US-East 2",
    capacity: "80%",
    lastEdited: "22/09/2023 10:45",
  },
  {
    workspace: "development_env",
    owner: "Mike Johnson",
    status: "Inactive",
    costs: "$4,200.00",
    region: "EU-West 1",
    capacity: "60%",
    lastEdited: "21/09/2023 14:30",
  },
  {
    workspace: "new_workspace_1",
    owner: "Alice Brown",
    status: "Inactive",
    costs: "$2,100.00",
    region: "US-West 2",
    capacity: "75%",
    lastEdited: "24/09/2023 09:15",
  },
]
const testing = () => {
  return (
    <>    <div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-50">
        Workspaces
      </h3>
      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
        Overview of all registered workspaces within your organization.
      </p>

    </div>

      <NavLink
        to="/dashboard/"
        className="
          hover:border-blue-500 transition duration-2 w-72 m-3 pt-2.5 pb-2.5 border
          border-blue-950 text-current flex gap-4 justify-center rounded-full
          font-geist-mono">
        <p className={cx(badgeVariants({ variant: "success" }), "cursor-pointer")}>Anchor</p>
      </NavLink >
      <ToastProvider>
        <MyComponent />
      </ToastProvider>
      <div className="flex flex-wrap justify-center gap-3">
        <Badge>Default</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    </>
  );
}

export default function MyTable({ datas }) {
  const data = [
    {
      workspace: "sales_by_day_api",
      owner: "John Doe",
      status: "Live",
      costs: "$3,509.00",
      region: "US-West 1",
      capacity: "99%",
      lastEdited: "23/09/2023 13:00",
    },
    {
      workspace: "marketing_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "test_environment",
      owner: "David Clark",
      status: "Inactive",
      costs: "$800.00",
      region: "EU-Central 1",
      capacity: "40%",
      lastEdited: "25/09/2023 16:20",
    },
    {
      workspace: "sales_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
  ]
  return (
    <>
      <Table className="m-4 mx-auto rounded font-geist">
        {/* Head section */}
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((header, idx) => (
              < TableHeaderCell
                key={idx}
                className={cx(Object.keys(data[0]).length - idx <= 2 ?
                  "text-right" : "")}
              >{header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        {/* Body section */}
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.workspace}>
              <TableCell >{item.workspace}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>
                <Badge
                  variant={item.status === "Inactive" ? "warning" : "default"}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>{item.capacity}</TableCell>
              <TableCell className="text-right">{item.costs}</TableCell>
              <TableCell className="text-right">{item.lastEdited}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >
    </>
  )
}

MyTable.propTypes = {
  datas: PropTypes.object,
}
