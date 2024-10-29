import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Mainlayout from './Layouts/Mainlayout';
import LogginLayout from "./Layouts/LogginLayout";
import DashLayout from "./Layouts/Dashboard/DashLayout";
import RepoLayout from "./Layouts/Dashboard/RepoLayout";
import UserLayout from "./Layouts/Dashboard/UserLayout";
import CreateLayout from "./Layouts/Dashboard/CreateLayout";
import ProtectedRoute from "./Layouts/Dashboard/ProtectedLayout";
import LogOut from "./Layouts/Dashboard/LogOut";
import Dashboard from "./Layouts/Dashboard/Dashboard";
import { AuthProvider } from "./Context/AuthProvider";
import AuthRedirect from "./Hooks/useAuthRedirect";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Mainlayout />} />
          <Route path="/login" element={<LogginLayout />} />
          <Route path="/auth-redirect" element={<AuthRedirect />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashLayout />}>
              <Route path="dash" element={<Dashboard />} />
              <Route path="repo" element={<RepoLayout />} />
              <Route path="user" element={<UserLayout />} />
              <Route path="create-repo" element={<CreateLayout />} />
              <Route path="log-out" element={<LogOut />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
