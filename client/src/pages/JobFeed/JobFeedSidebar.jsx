import React from "react";

const categories = ["Tutoring", "Design & Media", "Writing", "Programming"];

const JobFeedSidebar = ({ filters, setFilters, applyFilters }) => {
  const handleCategoryChange = (cat) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(cat);

      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== cat)
          : [...prev.categories, cat],
      };
    });
  };

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

      <div className="mb-6">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3">
          Category
        </p>

        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="accent-[#348293]"
              />
              <span className="text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3">
          Pay Range (৳)
        </p>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minBudget}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minBudget: e.target.value,
              }))
            }
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxBudget}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxBudget: e.target.value,
              }))
            }
            className="w-full p-2 border rounded-xl"
          />
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-bold text-gray-400 uppercase mb-3">
          Job Type
        </p>

        <div className="space-y-2">
          {["Any", "One-time", "Ongoing"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="jobType"
                checked={filters.jobType === type}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, jobType: type }))
                }
                className="accent-[#348293]"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full py-3 rounded-full bg-[#348293] text-white font-semibold hover:bg-[#2b6d75] transition"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default JobFeedSidebar;
