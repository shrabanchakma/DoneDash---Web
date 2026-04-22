import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../../context/AuthContext";

const MainLayout = () => {
  const { user } = useAuth();
  console.log("user---->", user);
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
MainLayout.propTypes = {};

export default MainLayout;
