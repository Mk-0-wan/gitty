import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from './MainLayout/Mainlayout';
import LogginLayout from "./MainLayout/LogginLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Mainlayout />} />
        {/* Manage all your routes here */}
        <Route path='/login' element={<LogginLayout />} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App;
