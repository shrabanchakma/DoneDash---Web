const CampusIllustration = () => {
  return (
    <div className="absolute bottom-0 right-0 w-48 h-36 rounded-2xl overflow-hidden z-0 opacity-80">
      <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-50 flex items-end justify-center relative">
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-red-400 rounded-sm opacity-90" />
        <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-1 p-2 w-20 h-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-sky-300 rounded-sm opacity-80" />
          ))}
        </div>
        <div className="absolute bottom-4 right-6">
          <div className="w-6 h-10 bg-green-400 rounded-full mx-auto" />
          <div className="w-1.5 h-4 bg-amber-700 mx-auto" />
        </div>
        <div className="absolute bottom-0 w-full h-4 bg-green-200" />
      </div>
    </div>
  );
};
export default CampusIllustration;
