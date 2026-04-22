import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import DoneDashLogo from "../components/DoneDashLogo";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  // const { loading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("poster");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });
  // track password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [errors, setErrors] = useState({});
  const handleSignup = async () => {
    const { firstName, lastName, email, password, agreedToTerms } = formData;
    const newErrors = {};
    // Basic Empty Field Validation
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    // Email Regex Validation (checks for @ and domain)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password Length Validation
    // Password Validation Logic
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      // Regex: At least 8 chars, 1 uppercase, 1 number, 1 special character

      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      } else if (!/(?=.*[A-Z])/.test(password)) {
        newErrors.password = "Must include at least one uppercase letter";
      } else if (!/(?=.*\d)/.test(password)) {
        newErrors.password = "Must include at least one number";
      } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
        newErrors.password = "Must include at least one special symbol";
      }
    }
    // Terms Validation
    if (!agreedToTerms) {
      newErrors.agreedToTerms = "You must accept the terms to continue";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    console.log("Signup Attempt:", {
      firstName,
      lastName,
      email,
      password,
      role,
      agreedToTerms,
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      // Save extra data (role)
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName.toLowerCase().trim(),
        lastName: lastName.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        role,
        createdAt: serverTimestamp(),
      });
      // navigate back to home
      navigate("/feed");
    } catch (error) {
      console.error(error.message);
      setErrors({ server: error.message });
    }
  };
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-base">
      {/* ───────── LEFT SIDE ───────── */}
      <div className="hidden lg:flex relative items-end p-10 text-white overflow-hidden">
        {/* Background */}
        <img
          src="https://www.thedailystar.net/sites/default/files/images/2022/05/30/smu-perma-cam.jpg"
          alt="campus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Soft overlay (lighter than login) */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />

        {/* Content */}
        <div className="relative z-10 max-w-md text-gray-700">
          <h1 className="text-5xl font-bold leading-tight mb-4 text-white drop-shadow-lg">
            Curate your campus experience.
          </h1>

          <p className="text-white/90 text-lg drop-shadow-md">
            Join the premier marketplace for academic services. Connect,
            collaborate, and conquer your goals.
          </p>
        </div>
      </div>

      {/* ───────── RIGHT SIDE ───────── */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <DoneDashLogo />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2 ">
            Create your account
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-medium hover:underline"
            >
              Log in
            </button>
          </p>

          {/* ROLE SELECT */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-3">
              I WANT TO...
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* POST JOB */}
              <div
                onClick={() => setRole("poster")}
                className={`p-0.5 rounded-2xl transition active:scale-[0.98]  ${
                  role === "poster"
                    ? "bg-linear-to-r from-[#348293] to-[#5AB65B]"
                    : "bg-gray-200"
                }`}
              >
                <div className="p-5 rounded-2xl bg-white cursor-pointer">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Post Jobs
                  </h3>
                  <p className="text-sm text-gray-500">
                    I need help with tasks, tutoring, or buying items.
                  </p>
                </div>
              </div>

              {/* HELP OUT */}
              <div
                onClick={() => setRole("helper")}
                className={`p-0.5 rounded-2xl transition active:scale-[0.98]  ${
                  role === "helper"
                    ? "bg-linear-to-r from-[#348293] to-[#5AB65B]"
                    : "bg-gray-200"
                }`}
              >
                <div className="p-5 rounded-2xl bg-white cursor-pointer">
                  <h3 className="font-semibold text-gray-800 mb-1">Help Out</h3>
                  <p className="text-sm text-gray-500">
                    I want to offer my services, tutor, or sell items.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* First Name */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                FIRST NAME
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Shraban"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-100 px-4 py-3 rounded-xl outline-none"
              />
              {/* Error Message */}
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                LAST NAME
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Cheng"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-gray-100 px-4 py-3 rounded-xl outline-none"
              />
              {/* Error Message */}
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 block mb-1">
              UNIVERSITY EMAIL
            </label>
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="shraban.cheng@university.edu"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
              />
            </div>
            {/* Email Error Message */}
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-sm text-gray-600 block mb-1">PASSWORD</label>
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl relative">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-transparent outline-none w-full pr-12"
              />
              <button
                type="button" // Important: prevents form submission if inside a <form>
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <LuEye className="w-5 h-5" />
                ) : (
                  <LuEyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* Password Error Message */}
            {errors.password ? (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.password}
              </p>
            ) : (
              <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                8+ characters, including 1 uppercase, 1 number, and 1 symbol.
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm text-gray-500 mt-4">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              className="mt-1"
            />
            <p>
              I agree to the{" "}
              <span className="text-primary cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primary cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
          {/* Terms Error Message */}
          {errors.agreedToTerms && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.agreedToTerms}
            </p>
          )}

          {/* Submit */}
          <div className="relative w-full mt-6 group">
            {/* Glow (teal only, hover only) */}
            <div className="absolute inset-0 rounded-full bg-[#348293] blur-md opacity-0 group-hover:opacity-60 transition duration-300" />

            {/* Border wrapper (teal only) */}
            <div className="relative p-0.5 rounded-full bg-[#348293]">
              {/* Button */}
              <button
                onClick={handleSignup}
                className="
      w-full 
      bg-[#348293] 
      text-white 
      font-semibold 
      py-3 
      rounded-full 
      transition-all duration-200 
      hover:opacity-90 
      active:scale-[0.98] 
      active:bg-[#2c6f7d] 
      cursor-pointer
    "
              >
                Create Account →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
