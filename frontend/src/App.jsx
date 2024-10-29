import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from './Layouts/Mainlayout';
import LogginLayout from "./Layouts/LogginLayout";
import DashLayout from "./Layouts/Dashboard/DashLayout";
import RepoLayout from "./Layouts/Dashboard/RepoLayout";
import UserLayout from "./Layouts/Dashboard/UserLayout";
import CreateLayout from "./Layouts/Dashboard/CreateLayout";
import ProtectedLayout from "./Layouts/Dashboard/ProtectedLayout";
import LogOut from "./Layouts/Dashboard/LogOut";
import Dashboard from "./Layouts/Dashboard/Dashboard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Mainlayout />} />
        <Route path='/login' element={<LogginLayout />} />
        {/* Manage all your routes here */}
        <Route element={<ProtectedLayout />}>
          <Route path='/dashboard' element={<DashLayout />} >
            <Route path='/dashboard/dash' element={<Dashboard />} />
            <Route path='/dashboard/repo' element={<RepoLayout />} />
            <Route path='/dashboard/user' element={<UserLayout />} />
            <Route path='/dashboard/create-repo' element={<CreateLayout />} />
            <Route path='/dashboard/log-out' element={<LogOut />} />
          </Route>
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App;
