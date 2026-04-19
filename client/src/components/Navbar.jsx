import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // Navigation links array for easier maintenance
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo / Brand Name */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-blue-600"
          >
            MERN<span className="text-gray-900">App</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  isActive ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Action Button (Optional) */}
          <Link
            to="/login"
            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-gray-700 active:scale-95"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
