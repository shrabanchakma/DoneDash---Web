import React, { use, useState } from "react"; // ADDED: useState
import PropTypes from "prop-types";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { LuEye, LuEyeClosed } from "react-icons/lu"; // ADDED: Eye icons
import DoneDashLogo from "../components/DoneDashLogo";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // ADDED: Firebase Auth
import { auth } from "../firebase/firebase"; // ADDED: Firebase Config
import { useAuth } from "../../context/AuthContext";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  // const { loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // CHANGE 1: Form State Management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // CHANGE 2: UI States (Loading, Error, Visibility)
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // CHANGE 3: Standardized Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // CHANGE 4: Login Logic with Strategic Error Handling
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const { email, password } = formData;
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // 1. Execute login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const loadingToast = toast.loading("Logging in...");

      // 2. LOGIC CHECK: Ensure the user object exists in the credential

      toast.success("Welcome back to DoneDash!", {
        id: loadingToast, // Replaces the loading toast
        duration: 4000,
        icon: "👋",
      });
      navigate("/feed");

      // Use replace: true to prevent the user from clicking 'back' into the login page
    } catch (error) {
      console.error(error.code);
      // Map Firebase codes to user-friendly messages
      if (error.code === "auth/invalid-credential") {
        setErrors({ server: "Invalid email or password." });
      } else if (error.code === "auth/too-many-requests") {
        setErrors({ server: "Too many failed attempts. Try again later." });
      } else {
        setErrors({ server: "Login failed. Please check your connection." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-base">
      {/* ───────── LEFT SIDE ───────── */}
      <div className="hidden lg:flex relative items-end p-10 text-white overflow-hidden">
        <img
          src="https://contextbd.com/wp-content/uploads/2017/07/SMUCT-03.jpg"
          alt="campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
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

      {/* ───────── RIGHT SIDE ───────── */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-center w-full">
            <DoneDashLogo />
          </div>

          <p className="text-center text-gray-500 mb-8">
            Sign in to your atelier
          </p>

          {/* CHANGE 5: Global Server Error Message */}
          {errors.server && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center font-medium">
              {errors.server}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-600 mb-2 block uppercase tracking-wide">
              Email Address
            </label>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                errors.email ? "bg-red-50 border border-red-200" : "bg-gray-100"
              }`}
            >
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email" // ADDED: name attribute
                value={formData.email} // ADDED: controlled value
                onChange={handleChange} // ADDED: onChange
                placeholder="you@university.edu"
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Password
              </label>
              <button className="text-sm text-primary hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl relative transition-all ${
                errors.password
                  ? "bg-red-50 border border-red-200"
                  : "bg-gray-100"
              }`}
            >
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"} // CHANGE 6: Dynamic type
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-gray-700 pr-12"
              />
              {/* CHANGE 7: Password Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <LuEye className="w-5 h-5" />
                ) : (
                  <LuEyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* CHANGE 8: Submit Button with Loading State */}
          <button
            onClick={handleLogin}
            disabled={isSubmitting}
            className={`w-full mt-6 bg-[#348293] text-white font-semibold py-3 rounded-full transition-all active:scale-[0.98] flex items-center justify-center 
              ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"}`}
          >
            {isSubmitting ? (
              <>
                <AiOutlineLoading className="w-5 h-5 animate-spin" />
              </>
            ) : (
              "SIGN IN"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button className="w-full border border-gray-200 py-3 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 cursor-pointer active:bg-gray-100 font-medium">
              <FcGoogle className="text-lg" /> GOOGLE
            </button>
            <button className="w-full border border-gray-200 py-3 rounded-full flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 cursor-pointer active:bg-gray-100 font-medium">
              <FaApple className="text-xl" /> APPLE
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

export default Login;
