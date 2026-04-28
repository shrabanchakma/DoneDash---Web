// src/components/ui/TakaIcon.jsx
import React from "react";

const TakaIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={size}
    width={size}
    className={className}
    id="Currency-Taka--Streamline-Tabler"
  >
    <desc>Currency Taka Streamline Icon: https://streamlinehq.com</desc>
    <path d="M15.5 15.5a1 1 0 1 0 2 0 1 1 0 1 0 -2 0" strokeWidth="2"></path>
    <path d="M7 7a2 2 0 1 1 4 0v9a3 3 0 0 0 6 0v-0.5" strokeWidth="2"></path>
    <path d="M8 11h6" strokeWidth="2"></path>
  </svg>
);

export default TakaIcon;
