import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/images/donedash-logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DoneDashLogo = ({ size = 12, textSize = "text-3xl" }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleLogoClick = () => {
    if (user) {
      navigate("/feed");
    } else {
      navigate("/");
    }
  };
  return (
    <div
      onClick={handleLogoClick}
      className="shrink-0 flex items-center gap-2 hover:cursor-pointer"
    >
      {/* Fixed the className syntax and Tailwind spacing classes */}
      <div
        className={`w-${size} h-${size} rounded-lg flex items-center justify-center`}
      >
        <img
          src={logo}
          alt="DoneDash Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className={`${textSize} font-bold tracking-tight text-[#27788e]`}>
        Done<span className="text-[#2d7b90] font-normal">Dash</span>
      </h1>
    </div>
  );
};

DoneDashLogo.propTypes = {};

export default DoneDashLogo;
