import React from "react";
import VerifiedBadge from "./VerifiedBadge";
import TextbookCard from "./TextbookCard";
import RecentRequestCard from "./RecentRequestCard";
import CampusIllustration from "./CampustIllustration";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="min-h-screen w-screen bg-linear-to-br from-slate-50 via-teal-50/30 to-cyan-50 flex items-center">
        <div className="max-w-7xl mx-auto w-screen px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div className="opacity-0 animate-fade-in">
              <div className="fade-up-1 inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-3 py-1 mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-xs font-semibold text-teal-700 tracking-wide">
                  Campus marketplace • Verified students only
                </span>
              </div>

              <h1 className="fade-up-2 text-6xl font-extrabold text-gray-900 leading-none tracking-tight mb-4">
                Help,
                <br />
                <span className="text-brand-primary">next door.</span>
              </h1>

              <p className="fade-up-3 text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
                Your campus marketplace concierge. From textbook trades to
                expert tutoring, connect with verified peers in a secure,
                curated environment.
              </p>

              <div className="fade-up-4 flex items-center gap-4 mb-10 flex-wrap">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 bg-action-success  hover:bg-action-success-hover text-white font-semibold px-6 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-teal-200 hover:shadow-lg group active:bg-action-success-active cursor-pointer"
                >
                  Get started
                </button>

                <button className="font-semibold text-brand-primary border-2 border-teal-400 hover:border-teal-400 px-6 py-3.5 rounded-full transition-all duration-200 hover:bg-teal-50">
                  Explore marketplace
                </button>
              </div>

              <div className="fade-up-5 flex items-center gap-3">
                <div className="flex">
                  {["JK", "MR", "SL"].map((i, idx) => (
                    <div
                      key={idx}
                      className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold bg-teal-500 ${
                        idx !== 0 ? "-ml-3" : ""
                      }`}
                    >
                      {i}
                    </div>
                  ))}
                  <div className="-ml-3 w-9 h-9 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                    5k+
                  </div>
                </div>

                <p className="text-sm text-gray-500 font-medium">
                  Trusted by{" "}
                  <span className="text-gray-800 font-semibold">
                    active students
                  </span>
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative h-120 hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl" />
              <VerifiedBadge />
              <TextbookCard />
              <CampusIllustration />
              <RecentRequestCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
