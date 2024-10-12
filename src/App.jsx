import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Jobspage from "./pages/Jobspage";
import Mainlayout from "./layout/Mainlayout";
import Jobpage from "./pages/Jobpage";
import Addjobs from "./components/Addjobs";
import { jobLoader } from "./utils/jobloader";
import EditedJob from "./pages/EditedJob";

function App() {
  // Post api/ call function handler in the front end
  const addJob = async (newJob) => {
    await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    return;
  };

  // Delete api/ call function
  const delJobs = async (job) => {
    await fetch(`/api/jobs/${job}`, {
      method: "DELETE",
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<Homepage />} />
        <Route path="/jobs" element={<Jobspage />} />
        {/* Get to know this that we are passing a funciton as a prop */}
        {/* We need to add the prop name to be assigned to the name of the function we are passing */}
        <Route path="/add-job" element={<Addjobs addJobsSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditedJob />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<Jobpage deleteJob={delJobs} />}
          loader={jobLoader}
        />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
