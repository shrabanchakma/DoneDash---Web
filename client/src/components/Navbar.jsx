import React from "react";
import { LuBell } from "react-icons/lu";
import logo from "../assets/images/donedash-logo.png";
import profileIcon from "../assets/profile-icon.jpeg";
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 items-center justify-between ">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center gap-2 ">
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
            {["Home", "Feature", "Pricing", "How It Works", "Blog"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full transition-all duration-200 hover:text-teal-600 hover:bg-teal-50"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          {/* Action Icons & Profile */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-teal-600 transition-colors duration-200">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              <LuBell className="w-5 h-5 text-gray-600 cursor-pointer" />{" "}
            </button>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            <button className="flex items-center gap-2 group">
              <img
                src={profileIcon}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-teal-500 transition-all duration-200"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Accent */}
      <div className="h-0.5 w-full bg-linear-gradient-to-r from-teal-500 via-teal-600 to-emerald-500"></div>
    </nav>
  );
};

export default Navbar;
