import React, { useEffect, useState, useCallback } from "react";
import api from "../../api/axios";
import TakaIcon from "../../components/ui/TakaIcon";
import JobFeedSidebar from "./JobFeedSidebar";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    categories: [],
    minBudget: "",
    maxBudget: "",
    jobType: "Any",
  });

  const [sort, setSort] = useState("newest");

  const fetchJobs = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        const currentPage = reset ? 1 : page;

        const res = await api.get("/jobs", {
          params: {
            page: currentPage,
            limit: 4,
            categories: filters.categories.join(","),
            minBudget: filters.minBudget,
            maxBudget: filters.maxBudget,
            jobType: filters.jobType,
            sort,
          },
        });

        const newJobs = res.data.jobs;

        if (reset) {
          setJobs(newJobs);
          setPage(2);
          setHasMore(newJobs.length === 4);
        } else {
          setJobs((prev) => [...prev, ...newJobs]);
          setPage((prev) => prev + 1);
          if (newJobs.length < 4) setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    },
    [filters, page, sort],
  );

  useEffect(() => {
    fetchJobs(true);
  }, [sort]);

  const applyFilters = () => {
    setHasMore(true);
    fetchJobs(true);
  };

  return (
    <div className="bg-gradient-to-b from-[#348293]/10 via-white to-white px-6 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        <JobFeedSidebar
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
        />

        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Recommended Jobs
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Premium opportunities curated for the campus community.
              </p>
            </div>

            <div className="relative inline-block">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white border border-gray-100 shadow-sm rounded-2xl px-6 py-3 pr-12 font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#348293]/20 transition-all cursor-pointer"
              >
                <option value="newest" className="cursor-pointer">
                  Newest First
                </option>
                <option value="budget_high" className="cursor-pointer">
                  Highest Pay
                </option>
                <option value="budget_low" className="cursor-pointer">
                  Lowest Pay
                </option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ↓
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50 hover:shadow-xl hover:shadow-[#348293]/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase tracking-widest bg-[#348293]/10 text-[#348293] px-4 py-1.5 rounded-full font-bold">
                    {job.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#348293] font-black text-lg">
                    <TakaIcon size={18} />
                    <span>{job.budget}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#348293] transition-colors line-clamp-1">
                  {job.title}
                </h3>

                <p className="text-gray-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <button className="text-sm font-bold text-[#348293] hover:underline cursor-pointer">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => fetchJobs()}
                disabled={loading}
                className="px-10 py-4 rounded-2xl bg-white border-2 border-gray-100 font-bold text-gray-700 hover:border-[#348293] hover:text-[#348293] active:scale-95 transition-all shadow-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Explore More Jobs"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFeed;
