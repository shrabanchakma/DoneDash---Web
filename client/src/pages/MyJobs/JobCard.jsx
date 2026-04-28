import React from "react";
import {
  MapPin,
  Calendar,
  MessageSquare,
  Receipt,
  Star,
  User,
  Clock,
} from "lucide-react";

const JobCard = ({ job }) => {
  const {
    title,
    description,
    location,
    status,
    stats,
    deadline,
    assignedTo,
    rating,
  } = job;

  // Status Badge Logic
  const getStatusStyles = () => {
    switch (status) {
      case "OPEN":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "IN PROGRESS":
        return "bg-sky-100 text-sky-700 border-sky-200";
      case "DONE":
        return "bg-gray-100 text-gray-500 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="group flex h-full flex-col rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-teal-900/5">
      {/* Header: Title & Status Badge */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold leading-tight text-gray-900 line-clamp-2">
          {title}
        </h3>
        <span
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getStatusStyles()}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${status === "OPEN" ? "bg-emerald-500" : status === "IN PROGRESS" ? "bg-sky-500" : "bg-gray-400"}`}
          />
          {status}
        </span>
      </div>

      {/* Meta Info Section */}
      <div className="mb-6 space-y-2">
        {status === "IN PROGRESS" ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User size={16} className="text-gray-400" />
            <span className="font-medium">
              Assigned to:{" "}
              <span className="text-gray-900 font-semibold">{assignedTo}</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} className="text-gray-400" />
            <span className="font-medium">{location}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="mb-8 flex-grow text-sm leading-relaxed text-gray-500 line-clamp-3">
        {description}
      </p>

      {/* Footer Divider */}
      <div className="mb-6 h-px w-full bg-gray-100" />

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between">
        {status === "OPEN" && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 font-bold text-sky-600 text-xs">
              {stats.proposals}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
              New Proposals
            </span>
          </div>
        )}

        {status === "IN PROGRESS" && (
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#348293] transition hover:opacity-70">
            <MessageSquare size={16} />
            Message Pro
          </button>
        )}

        {status === "DONE" && (
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-900 transition hover:opacity-70">
            <Receipt size={16} />
            View Receipt
          </button>
        )}

        {/* Dynamic Timing/Rating Info */}
        <div className="text-right">
          {status === "DONE" ? (
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < rating ? "#f97316" : "none"}
                  stroke={i < rating ? "#f97316" : "#cbd5e1"}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
              <Clock size={12} />
              <span className="uppercase tracking-tighter">
                {status === "IN PROGRESS"
                  ? `Due in ${deadline}`
                  : `Posted ${deadline}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
