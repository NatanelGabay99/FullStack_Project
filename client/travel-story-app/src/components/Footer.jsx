import { FcAbout } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Footer = () => {
  const navigate = useNavigate();
  const isToken = localStorage.getItem("accessToken");

  return (
    <div className="bg-slate-200 flex items-center justify-center px-6 py-6 bottom-0 z-10">
      {/* Home Section */}
      <div className="flex flex-col items-center mx-[3em]">
        {isToken ? (
          <>
            <MdDashboard
              className="text-2xl text-gray-700 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />
            <span className="mt-1 text-sm font-medium text-gray-700">
              Dashboard
            </span>
          </>
        ) : (
          <>
            <FaHome
              className="text-2xl text-gray-700 cursor-pointer"
              onClick={() => navigate("/home")}
            />
            <span className="mt-1 text-sm font-medium text-gray-700">Home</span>
          </>
        )}
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center mx-[3em]">
        <FcAbout
          className="text-2xl text-gray-700 cursor-pointer"
          onClick={() => navigate("/about")}
        />
        <span className="mt-1 text-sm font-medium text-gray-700">About</span>
      </div>
    </div>
  );
};

export default Footer;
