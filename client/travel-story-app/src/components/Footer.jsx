import { FcAbout } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
<div className="bg-slate-100 flex items-center justify-center px-6 py-2 z-10">
  {/* Home Section */}
  <div className="flex flex-col items-center mx-[3em]">
    <div className="border-2 border-gray-400 p-3 rounded-md">
      <FaHome className="text-2xl text-gray-700 cursor-pointer" 
       onClick={() => navigate("/home")}
      />
    </div>
    <span className="mt-1 text-sm font-medium text-gray-700"
    >Home</span>
  </div>

  {/* About Section */}
  <div className="flex flex-col items-center mx-[3em]">
    <div className="border-2 border-gray-400 p-3 rounded-md">
      <FcAbout className="text-2xl text-gray-700 cursor-pointer" 
       onClick={() => navigate("/about")}
      />
    </div>
    <span className="mt-1 text-sm font-medium text-gray-700"
    >About</span>
  </div>
</div>

  );
};

export default Footer;
