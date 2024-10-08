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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Mainlayout />}>
      <Route index element={<Homepage />} />
      <Route path="/jobs" element={<Jobspage />} />
      <Route path="/add-job" element={<Addjobs />} />
      <Route path="/jobs/:id" element={<Jobpage />} loader={jobLoader} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
