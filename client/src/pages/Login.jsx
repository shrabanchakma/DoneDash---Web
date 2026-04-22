import React from "react";
import PropTypes from "prop-types";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import DoneDashLogo from "../components/DoneDashLogo";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-base">
      {/* ───────── LEFT SIDE (Image Section) ───────── */}
      <div className="hidden lg:flex relative items-end p-10 text-white overflow-hidden">
        {/* Background Image */}
        <img
          src="https://contextbd.com/wp-content/uploads/2017/07/SMUCT-03.jpg"
          alt="campus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay (for readability) */}

        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Curate your campus experience.
          </h1>

          <p className="text-white/80 text-lg">
            Join the premier marketplace for academic services. Connect,
            collaborate, and conquer your goals.
          </p>
        </div>
      </div>

      {/* ───────── RIGHT SIDE (Login Form) ───────── */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          {/* Logo */}
          {/* <h1 className="text-3xl font-bold text-center text-primary mb-2">
            DoneDash
          </h1> */}
          <div className="flex justify-center w-full">
            <DoneDashLogo />
          </div>

          <p className="text-center text-gray-500 mb-8">
            Sign in to your atelier
          </p>

          {/* Email */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              EMAIL ADDRESS
            </label>
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="you@university.edu"
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-600">
                PASSWORD
              </label>
              <button className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-gray-700"
              />
            </div>
          </div>

          {/* Button */}
          <button className="w-full mt-6 bg-brand-primary hover:cursor-pointer  active:opacity-100 hover:opacity-90 text-white font-semibold py-3 rounded-full transition">
            SIGN IN
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3 ">
            <button className="w-full border border-gray-200 py-3 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100">
              <FcGoogle /> GOOGLE
            </button>

            <button className="w-full border border-gray-200 py-3 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100">
              <FaApple className="text-xl " /> APPLE
            </button>
          </div>

          {/* Bottom */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-primary font-medium cursor-pointer hover:underline"
            >
              Apply now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
