import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  CloudUpload,
  DollarSign,
  MapPin,
  Calendar,
  Plus,
  X,
} from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import TakaIcon from "../../components/ui/TakaIcon";
import { useNavigate } from "react-router-dom";

const categories = [
  "Academic Help",
  "Creative Services",
  "Events",
  "Errands",
  "Others",
];

const initialForm = {
  title: "",
  description: "",
  category: "Others",
  location: "",
  deadline: "",
  budget: "",
  imagesBase64: [],
};

export default function PostJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user.email);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [budgetFocused, setBudgetFocused] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategory = (cat) => {
    setForm((prev) => ({ ...prev, category: cat }));
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length === 0) {
      toast.error("Please select valid image files.");
      return;
    }

    const readers = validFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            const result = reader.result;
            if (typeof result !== "string") {
              reject(new Error("Could not read image."));
              return;
            }

            const base64 = result.split(",")[1];
            resolve({
              base64,
              preview: result,
            });
          };

          reader.onerror = () => reject(new Error("Could not read image."));
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers)
      .then((results) => {
        // ✅ CHANGED: append instead of replace
        setForm((prev) => ({
          ...prev,
          imagesBase64: [
            ...prev.imagesBase64,
            ...results.map((img) => img.base64),
          ],
        }));

        setImagePreviews((prev) => [
          ...prev,
          ...results.map((img) => img.preview),
        ]);
      })
      .catch(() => {
        toast.error("Failed to read one or more images.");
      });
  };

  const removeImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      imagesBase64: prev.imagesBase64.filter(
        (_, index) => index !== indexToRemove,
      ),
    }));

    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  // ✅ CHANGED: submit multiple images
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      description,
      category,
      location,
      deadline,
      budget,
      imagesBase64,
    } = form;

    if (
      !title.trim() ||
      !description.trim() ||
      !category.trim() ||
      !location.trim() ||
      !deadline ||
      !budget ||
      imagesBase64.length === 0
    ) {
      toast.error("Please fill all fields and upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        budget: Number(form.budget),
        imagesBase64,
        userEmail: user.email,
        status: "OPEN",
      };

      await api.post("/jobs", payload);
      toast.success("Job posted successfully!");
      setForm(initialForm);
      setImagePreviews([]);
      navigate("/my-jobs");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to post job. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-[#348293]/15 to-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#348293]">
            Post an Opportunity
          </h1>
          <p className="mt-3 max-w-xl text-gray-500">
            Describe your needs clearly to attract the best talent on campus.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* LEFT PANEL */}
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
              The Essentials
            </h2>

            {/* TITLE */}
            <div className="mb-5">
              <label className="text-sm font-bold text-gray-500">
                Job Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Need a photographer for graduation"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:ring-2 focus:ring-[#348293]"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">
              <label className="text-sm font-bold text-gray-500">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Explain the task, expectations, and any specific requirements..."
                className="mt-2 h-32 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:ring-2 focus:ring-[#348293]"
                required
              />
            </div>

            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
              Details
            </h2>

            <label className="text-sm font-bold text-gray-500">Category</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategory(cat)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm transition ${
                    form.category === cat
                      ? "bg-gradient-to-r from-[#348293] to-[#2b6d75] text-white shadow"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* LOCATION */}
              <div className="flex flex-col">
                <label className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  Location
                </label>
                <div
                  className={`flex items-stretch overflow-hidden rounded-2xl border bg-gray-50 transition-all duration-200 ${
                    focusedField === "location"
                      ? "border-[#348293] ring-4 ring-[#348293]/10"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-center px-4">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="location"
                    value={form.location}
                    onFocus={() => setFocusedField("location")}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleChange}
                    placeholder="Campus, Library, Remote..."
                    className="w-full bg-transparent py-4 pr-4 text-base font-medium text-gray-900 placeholder-gray-300 outline-none"
                    required
                  />
                </div>
              </div>

              {/* DEADLINE */}
              <div className="flex flex-col">
                <label className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  Deadline
                </label>
                <div
                  className={`flex items-stretch overflow-hidden rounded-2xl border bg-gray-50 transition-all duration-200 ${
                    focusedField === "deadline"
                      ? "border-[#348293] ring-4 ring-[#348293]/10"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-center px-4">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onFocus={() => setFocusedField("deadline")}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleChange}
                    className="w-full bg-transparent py-4 pr-4 text-base font-medium text-gray-900 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            {/* BUDGET */}
            <div className="w-full rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-900">
                Budget
              </h2>

              <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Offered Pay
              </label>

              <div
                className={`flex items-stretch overflow-hidden rounded-2xl border transition-all duration-200 ${
                  budgetFocused
                    ? "border-[#348293] ring-4 ring-[#348293]/10"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-center border-r border-slate-200 bg-gray-50 px-6">
                  <TakaIcon className="h-5 w-5 stroke-[2.5px] text-gray-900" />
                </div>

                <input
                  type="number"
                  name="budget"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.budget}
                  onFocus={() => setBudgetFocused(true)}
                  onBlur={() => setBudgetFocused(false)}
                  onChange={handleChange}
                  className="w-full bg-white px-5 py-4 text-xl font-semibold text-gray-900 placeholder-gray-300 outline-none"
                  required
                />
              </div>

              <p className="mt-5 text-sm leading-snug text-gray-500">
                Set a fair price to attract quality applicants quickly.
              </p>
            </div>

            {/* MEDIA */}
            <div className="w-full rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Media
                </h2>
                <span className="rounded-md bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Required
                </span>
              </div>

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-gray-200 p-6 transition hover:border-[#348293]/30 hover:bg-[#348293]/5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImage}
                  hidden
                />
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                  <CloudUpload className="h-10 w-10 stroke-[1.5px] text-emerald-700" />
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900">
                  Click to upload image
                </h3>
                <p className="text-sm text-gray-400">
                  SVG, PNG, JPG or GIF (max. 5MB)
                </p>
              </label>

              {imagePreviews.length > 0 && (
                <div className="mt-6 grid grid-cols-4 gap-4 max-w-sm">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100"
                    >
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />

                      {/* ✅ NEW: remove button */}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#348293] to-[#2b6d75] py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Publishing..." : "Publish Job →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
