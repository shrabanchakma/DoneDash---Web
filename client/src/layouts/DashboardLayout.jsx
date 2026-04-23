import React from "react";
import PropTypes from "prop-types";
import { Sidebar } from "lucide-react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-base-canvas">
      {/* Keeping a simplified Navbar */}
      <Navbar isDashboard={true} />

      <div className="max-w-7xl mx-auto flex gap-8 px-6 py-10">
        {/* Optional Sidebar for Profile, Security, History */}
        {/* <aside className="hidden lg:block w-64 shrink-0">
          <Sidebar />
        </aside> */}

        {/* Main Settings/Profile Area */}
        <main className="grow bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {};

export default DashboardLayout;
