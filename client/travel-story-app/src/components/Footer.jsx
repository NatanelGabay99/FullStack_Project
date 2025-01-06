import { FcAbout } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Footer = () => {
  const navigate = useNavigate();
  const isToken = localStorage.getItem("accessToken");

  return (
    <div className="bg-slate-200 flex flex-col items-center px-6 py-6">
 
  <div className="flex justify-center">
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

    <div className="flex flex-col items-center mx-[3em]">
      <FcAbout
        className="text-2xl text-gray-700 cursor-pointer"
        onClick={() => navigate("/about")}
      />
      <span className="mt-1 text-sm font-medium text-gray-700">About</span>
    </div>
  </div>

  
  <div className="mt-4 text-center text-sm text-gray-600 font-medium">
    © {new Date().getFullYear()} Natanel Gabay. All rights reserved.
  </div>
</div>

  );
};

export default Footer;
