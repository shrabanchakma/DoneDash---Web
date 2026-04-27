import React, { useEffect, useRef, useState } from "react";
import { LuBell } from "react-icons/lu";
import logo from "../assets/images/donedash-logo.png";
import profileIcon from "../assets/profile-icon.jpeg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { navConfig } from "../constants/navConfig";

const Navbar = () => {
  const { user, role, firstName } = useAuth();
  console.log(user);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = navConfig[role] || navConfig.guest;
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // This wipes the React state entirely and redirects to the landing page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleLogoClick = () => {
    console.log("click");
    if (user) {
      navigate("/feed");
    } else {
      navigate("/");
    }
  };
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 items-center justify-between ">
          {/* Logo Section */}
          <div
            onClick={handleLogoClick}
            className="shrink-0 flex items-center gap-2 hover:cursor-pointer active:scale-95"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center">
              <img
                src={logo}
                alt="DoneDash Logo"
                className="w-full h-full object-contain "
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-brand-primary ">
              Done
              <span className="text-brand-primary font-normal">Dash</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                // 2. Use the isActive callback to toggle classes
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-teal-600 bg-teal-50 shadow-sm" // Active Styles
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50" // Inactive Styles
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Action Icons & Profile */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-teal-600 transition-colors duration-200">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              <LuBell className="w-5 h-5 text-gray-600 cursor-pointer" />{" "}
            </button>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 group"
              >
                <img
                  src={profileIcon}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-teal-500 transition-all duration-200 hover:cursor-pointer"
                />
              </button>
              {/* Dropdown */}
              {open && user && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
                  >
                    {firstName} - {role}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Accent */}
      <div className="h-0.5 w-full bg-linear-gradient-to-r from-teal-500 via-teal-600 to-emerald-500"></div>
    </nav>
  );
};

export default Navbar;
