import helpImage from "../../assets/images/help.png";
const TextbookCard = () => {
  return (
    <div className="absolute top-0 right-0 bg-white rounded-2xl shadow-xl p-4 w-64 z-10 animate-float-medium">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              Help, next door.
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Earn extra cash or get tasks done by verified students in your
              campus community.
            </p>
          </div>
        </div>
        <span className="text-sm font-bold text-teal-600 ml-2">$45</span>
      </div>
      {/* <div className="w-full h-28 bg-gradient-to-br from-teal-700 to-teal-900 rounded-xl flex items-center justify-center overflow-hidden relative">
        <div className="w-16 h-24 bg-gray-100 rounded shadow-inner relative flex items-end justify-center pb-2">
          <div className="w-3 h-4 bg-red-500 rounded-sm" />
        </div>
      </div> */}
      <div className="overflow-hidden">
        <img
          src={helpImage}
          alt="Help and Support"
          className="w-full h-28 object-cover rounded-xl opacity-80 scale-125"
        />
      </div>
    </div>
  );
};

export default TextbookCard;
