import React from "react";
import PropTypes from "prop-types";
import HeroSection from "./HeroSection/HeroSection";

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center ">
      <HeroSection />
      {/* <h1 className="text-4xl font-bold text-gray-800">This is Home</h1> */}
    </div>
  );
};

Home.propTypes = {};

export default Home;
