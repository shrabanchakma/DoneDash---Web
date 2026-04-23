import projectImage from "../../assets/images/project.png";
const CampusIllustration = () => {
  return (
    <div className="absolute bottom-0 right-0 w-48 h-36 rounded-2xl overflow-hidden z-0 opacity-80">
      <img
        src={projectImage}
        alt="Help and Support"
        className="w-full h-full object-cover scale-125"
      />
    </div>
  );
};
export default CampusIllustration;
