import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import JobCard from "./JobCard";
import axios from "../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`/jobs/user/jobs/?email=${user.email}`);
        console.log("here are the jobs: ", res.data);
        setJobs(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formattedJobs = jobs.map((job) => {
    const dateObj = new Date(job.deadline);

    // Format: "month day"
    const formattedDeadline = dateObj
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
      .toLowerCase();

    return {
      id: job._id,
      title: job.title,
      description: job.description,
      location: job.location,
      status: job.status || "OPEN",
      deadline: formattedDeadline,
      stats: { proposals: job.proposalsCount || 0 },
      rating: 0,
    };
  });

  // handle loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading jobs...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-[#348293]/15 to-white px-6 pb-24 pt-20">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-brand-primary">
              Active Jobs
            </h1>
            <p className="text-xl leading-relaxed text-gray-400">
              Manage your ongoing requests, review proposals, and track
              completed work in your curated dashboard.
            </p>
          </div>

          <Link
            to="/post-job"
            className="flex items-center gap-3 rounded-full bg-[#348293] px-8 py-4 font-bold text-white shadow-lg shadow-[#348293]/20 transition-all hover:bg-[#2b6d75] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Plus size={20} strokeWidth={3} />
            <span className="uppercase tracking-widest text-sm">
              Post a Job
            </span>
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {formattedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {/* Empty State / Add New Placeholder */}
          {formattedJobs.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-[2.5rem]">
              <p className="text-gray-400 font-medium">No jobs posted yet.</p>
              {/* Optional: Add a button here to encourage posting */}
            </div>
          ) : (
            /* 3. ALWAYS SHOW THE 'ADD NEW' CARD AT THE END IF JOBS EXIST */
            <Link
              to="/post-job"
              className="flex h-full min-h-[350px] cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-gray-800 bg-transparent transition-colors hover:border-[#348293]/50 group "
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary group-hover:bg-[#348293]/10 transition-colors group-active:bg-brand-primary ">
                <Plus className="text-white group-hover:text-[#348293] group-active:text-white" />
              </div>
              <p className="font-bold uppercase tracking-widest text-gray-600 group-hover:text-[#348293] ">
                Add New Job
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPostedJobs;
