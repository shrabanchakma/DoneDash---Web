import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layouts/AuthLayout";
import Feed from "./pages/Feed";
import ProtectedRoute from "../routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Profile from "./pages/Profile";
import UnderMaintenance from "./components/UnderMaintenance";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      {/* <Route path="/login" element={<Login />} /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/features" element={<UnderMaintenance />} />
          <Route path="/pricing" element={<UnderMaintenance />} />
          <Route path="/how-it-works" element={<UnderMaintenance />} />
          <Route path="/post-job" element={<UnderMaintenance />} />
          <Route path="/my-jobs" element={<UnderMaintenance />} />
          <Route path="/proposals" element={<UnderMaintenance />} />
          <Route path="/browse-jobs" element={<UnderMaintenance />} />
          <Route path="/active-tasks" element={<UnderMaintenance />} />
          <Route path="/admin/stats" element={<UnderMaintenance />} />
          <Route path="/admin/users" element={<UnderMaintenance />} />
          <Route path="/admin/reports" element={<UnderMaintenance />} />
          <Route path="/admin/settings" element={<UnderMaintenance />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<UnderMaintenance />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
