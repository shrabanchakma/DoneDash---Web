import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CloudUpload, DollarSign, MapPin, Calendar, X } from "lucide-react";
import api from "../../api/axios";
import TakaIcon from "../../components/ui/TakaIcon";
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
};

export default function UpdateJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // FORM STATE
  const [form, setForm] = useState(initialForm);
  const [originalForm, setOriginalForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // IMAGE STATE
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // UI STATE
  const [focusedField, setFocusedField] = useState(null);
  const [budgetFocused, setBudgetFocused] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fileInputRef = useRef(null);

  // =========================
  // FETCH JOB
  // =========================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        const job = res.data;

        const formatted = {
          title: job.title,
          description: job.description,
          category: job.category,
          location: job.location,
          deadline: job.deadline.split("T")[0],
          budget: job.budget,
        };

        setForm(formatted);
        setOriginalForm(formatted);

        // IMAGES
        setExistingImages(job.images);
        setImagePreviews(job.images);
      } catch (err) {
        toast.error("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // =========================
  // FORM HANDLERS
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategory = (cat) => {
    setForm((prev) => ({ ...prev, category: cat }));
  };

  // =========================
  // IMAGE UPLOAD
  // =========================
  const handleImage = (e) => {
    const files = Array.from(e.target.files || []);

    const readers = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            const result = reader.result;
            if (typeof result !== "string") return reject();

            resolve({
              base64: result.split(",")[1],
              preview: result,
            });
          };

          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers).then((results) => {
      setNewImages((prev) => [...prev, ...results.map((img) => img.base64)]);

      setImagePreviews((prev) => [
        ...prev,
        ...results.map((img) => img.preview),
      ]);
    });
  };

  // =========================
  // REMOVE IMAGE
  // =========================
  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  // =========================
  // DIRTY CHECK
  // =========================
  const isDirty =
    JSON.stringify(form) !== JSON.stringify(originalForm) ||
    newImages.length > 0 ||
    existingImages.length !== imagePreviews.length;

  // =========================
  // UPDATE
  // =========================
  const confirmUpdate = async () => {
    try {
      setLoading(true);

      await api.patch(`/jobs/${id}`, {
        ...form,
        budget: Number(form.budget),
        existingImages,
        newImages,
      });

      toast.success("Job updated!");
      setShowUpdateModal(false);
      navigate("/my-jobs");
    } catch (err) {
      toast.error("Update failed");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const confirmDelete = async () => {
    try {
      await api.delete(`/jobs/${id}`);
      toast.success("Job deleted");
      navigate("/my-jobs");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#348293]/15 to-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-[#348293] mb-8">Update Job</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-4 p-3 border rounded-xl"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-xl"
            />

            {/* CATEGORY */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  type="button"
                  className={`cursor-pointer px-4 py-2 rounded-full ${
                    form.category === cat
                      ? "bg-[#348293] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* LOCATION */}
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full mt-4 p-3 border rounded-xl"
            />

            {/* DEADLINE */}
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full mt-4 p-3 border rounded-xl"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* BUDGET */}
            {/* BUDGET */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              {/* 🔥 ADDED: label for clarity */}
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Offered Pay
              </label>

              {/* 🔥 UPDATED: wrapper for icon + input */}
              <div
                className={`flex items-center overflow-hidden rounded-xl border transition-all ${
                  budgetFocused
                    ? "border-[#348293] ring-4 ring-[#348293]/10"
                    : "border-gray-200"
                }`}
              >
                {/* 🔥 ADDED: icon section */}
                <div className="px-4 bg-gray-50 border-r border-gray-200">
                  <TakaIcon className="text-gray-700" />
                </div>

                {/* 🔥 UPDATED: input styling */}
                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  onFocus={() => setBudgetFocused(true)} // 🔥 ADDED
                  onBlur={() => setBudgetFocused(false)} // 🔥 ADDED
                  placeholder="0.00"
                  className="w-full px-4 py-3 text-lg font-semibold outline-none bg-white"
                />
              </div>

              {/* 🔥 ADDED: helper text */}
              <p className="text-xs text-gray-400 mt-3">
                Set a competitive price to attract better applicants.
              </p>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              {/* 🔥 HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                  Media
                </h2>
                <span className="text-xs text-gray-400">Required</span>
              </div>

              {/* 🔥 CLICKABLE UPLOAD AREA */}
              <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-[#348293]/40 hover:bg-[#348293]/5 transition">
                <input
                  type="file"
                  multiple
                  onChange={handleImage}
                  ref={fileInputRef}
                  hidden // 🔥 IMPORTANT: hide default input
                />

                {/* 🔥 ICON */}
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-50 rounded-full mb-4">
                  <CloudUpload className="text-emerald-600" />
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Click to upload images
                </p>

                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </label>
            </div>

            {/* PREVIEW */}
            <div className="grid grid-cols-3 gap-3">
              {imagePreviews.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black text-white px-2 rounded"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* UPDATE BUTTON */}
            <button
              disabled={!isDirty}
              onClick={() => setShowUpdateModal(true)}
              className="w-full py-4 px-6 rounded-2xl font-bold text-white shadow-lg shadow-[#348293]/20 
    bg-gradient-to-r from-[#348293] to-[#4fa9bc] 
    hover:from-[#2a6a78] hover:to-[#348293] 
    active:scale-[0.98] 
    transition-all duration-300 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
            >
              Update Job
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-4 px-6 rounded-2xl font-bold text-white shadow-lg shadow-red-200 
    bg-gradient-to-r from-red-500 to-rose-400 
    hover:from-red-600 hover:to-red-500 
    active:scale-[0.98] 
    transition-all duration-300 cursor-pointer"
            >
              Delete Job
            </button>
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-sm"
            onClick={() => setShowUpdateModal(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-2xl transition-all">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#348293]/10 text-[#348293]">
              <CloudUpload size={32} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Push Updates?</h3>
            <p className="mt-3 text-gray-500">
              Are you sure you want to save these changes to your job details?
              This action will update the live listing.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={confirmUpdate}
                className="w-full rounded-2xl bg-gradient-to-r from-[#348293] to-[#4fa9bc] py-4 font-bold text-white shadow-lg shadow-[#348293]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Confirm & Publish
              </button>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="w-full rounded-2xl py-4 font-semibold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Nevermind
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />

          <div className="relative w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-2xl transition-all">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
              <X size={32} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              Delete Job Post?
            </h3>
            <p className="mt-3 text-gray-500">
              This will permanently remove the job from the marketplace. This
              action cannot be undone.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={confirmDelete}
                className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 py-4 font-bold text-white shadow-lg shadow-red-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Delete Permanently
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full rounded-2xl py-4 font-semibold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Keep My Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
