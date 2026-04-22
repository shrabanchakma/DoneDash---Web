// src/constants/navConfig.js
export const navConfig = {
  guest: [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "How It Works", path: "/how-it-works" },
  ],
  poster: [
    { label: "Home", path: "/" },
    { label: "Post a Job", path: "/post-job" },
    { label: "My Posted Jobs", path: "/my-jobs" },
    { label: "View Proposals", path: "/proposals" },
  ],
  helper: [
    { label: "Home", path: "/feed" },
    { label: "Find Work", path: "/browse-jobs" },
    { label: "My Active Jobs", path: "/active-tasks" },
    { label: "My Proposals", path: "/my-proposals" },
  ],
  admin: [
    { label: "Overview", path: "/admin/stats" },
    { label: "User Management", path: "/admin/users" },
    { label: "Flagged Content", path: "/admin/reports" },
    { label: "System Settings", path: "/admin/settings" },
  ],
};
