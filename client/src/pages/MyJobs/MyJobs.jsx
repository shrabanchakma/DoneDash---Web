import React, { useState } from "react";
import { Plus } from "lucide-react";
import JobCard from "./JobCard";

const MyJobs = () => {
  // Mock data representing different university/professional scenarios
  const [activeJobs] = useState([
    {
      id: 1,
      title: "Vintage Camera Restoration",
      description:
        "Looking for an expert to clean and restore a 1970s Leica M4. The shutter mechanism is slightly sticky and requires professional attention.",
      location: "Local Drop-off • Boston, MA",
      status: "OPEN",
      deadline: "2d ago",
      stats: { proposals: 4 },
      rating: 0,
    },
    {
      id: 2,
      title: "Custom Bookshelf Build",
      description:
        "Floor-to-ceiling walnut bookshelf installation for home office. Materials have been ordered.",
      location: "On-site",
      assignedTo: "Alex M.",
      status: "IN PROGRESS",
      deadline: "5 days",
      stats: { proposals: 12 },
      rating: 0,
    },
    {
      id: 3,
      title: "Garden Landscaping",
      description:
        "Front yard cleanup, mulching, and planting of perennial shrubs. This includes old stump removal.",
      location: "Residential",
      status: "DONE",
      deadline: "Oct 12",
      stats: { proposals: 8 },
      rating: 5,
    },
  ]);

  return (
    <div className="min-h-screen bg-black px-6 pb-24 pt-20">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-white">
              Active Projects
            </h1>
            <p className="text-xl leading-relaxed text-gray-400">
              Manage your ongoing requests, review proposals, and track
              completed work in your curated dashboard.
            </p>
          </div>

          <button className="flex items-center gap-3 rounded-full bg-[#348293] px-8 py-4 font-bold text-white shadow-lg shadow-[#348293]/20 transition-all hover:bg-[#2b6d75] hover:scale-105 active:scale-95">
            <Plus size={20} strokeWidth={3} />
            <span className="uppercase tracking-widest text-sm">
              Post a Job
            </span>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activeJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {/* Empty State / Add New Placeholder */}
          <div className="flex h-full min-h-[350px] cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-gray-800 bg-transparent transition-colors hover:border-[#348293]/50 group">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 group-hover:bg-[#348293]/10 transition-colors">
              <Plus className="text-gray-600 group-hover:text-[#348293]" />
            </div>
            <p className="font-bold uppercase tracking-widest text-gray-600 group-hover:text-[#348293]">
              Create New Request
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
