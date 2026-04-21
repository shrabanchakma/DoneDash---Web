const VerifiedBadge = () => {
  return (
    <div className="absolute top-6 left-0 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 z-20 animate-float-slow">
      <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-sm font-semibold text-gray-700">
        Verified .edu Email
      </span>
    </div>
  );
};

export default VerifiedBadge;
