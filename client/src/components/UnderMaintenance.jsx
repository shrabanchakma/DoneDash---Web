import React from "react";
import construction from "../assets/animations/maintenance.gif";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

const UnderMaintenance = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      {/* Lottie Animation */}
      <div className="w-full max-w-sm mb-8">
        <img src={construction} alt="" />
      </div>

      {/* Funny Academic Messages */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        This page is taking a quick power nap. 😴
      </h1>

      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
        It’s been working really hard lately and needed a small break. We’re
        currently waking it up with a big cup of coffee and some fresh ideas. It
        should be back on its feet and ready to help you very soon!
      </p>

      {/* Action Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md active:scale-95"
      >
        Take me back to safety
      </button>
    </div>
  );
};

export default UnderMaintenance;
