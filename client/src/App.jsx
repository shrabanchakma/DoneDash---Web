import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./layouts/AuthLayout";
import Feed from "./pages/Feed";
import ProtectedRoute from "../routes/ProtectedRoute";

function App() {
  return (
    <>
      {/* <Route path="/login" element={<Login />} /> */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Routes element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
