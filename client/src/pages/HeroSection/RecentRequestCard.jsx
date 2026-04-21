const RecentRequestCard = () => {
  return (
    <div className="absolute bottom-8 left-4 bg-white rounded-2xl shadow-xl px-4 py-3 w-64 z-20 animate-float-fast">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">📢</span>
        <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">
          Recent Request
        </span>
      </div>
      <p className="text-sm text-gray-700 font-medium leading-snug mb-3">
        "Looking for a CS101 tutor this weekend. Need help with Python basics."
      </p>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
        <span className="text-xs text-gray-400">Posted 2h ago by Alex</span>
      </div>
    </div>
  );
};

export default RecentRequestCard;
