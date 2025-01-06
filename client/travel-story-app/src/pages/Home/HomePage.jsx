import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";
import LOGO from "../../../public/logo.svg";

import StorySlideShowCarousel from "../../components/StorySlideShowCarousel";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar/>

      <div className="container w-full max-w-full py-10 bg-[#e7f1fa]">
        <div className="flex flex-col items-center text-center justify-center mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-600">
            Welcome to
          </h1>
          <img
            src={LOGO}
            alt="travel-story"
            className="h-20 hover:bg-cyan-100 px-3 py-1 rounded  ease-in-out duration-1000"
          />
          <div className="text-center">
            <h2 className="text-lg md:text-2xl font-semibold text-cyan-600">
              &quot;Your Journey, Their Stories&quot;
            </h2>
            <p className="text-xl sm:text-lg text-gray-600 mt-2">
              Discover{" "}
              <span className="text-cyan-500 font-medium">
                Other Travel Experiences
              </span>{" "}
              from Around the World.
            </p>
            <p className="text-xl sm:text-lg text-gray-600 mt-3">
              To learn more about the app, click {""}{" "}
              <span
                className="text-cyan-500 font-semibold cursor-pointer"
                onClick={() => navigate("/about")}
              >
                here
              </span>{" "}
              {""}
            </p>
          </div>
        </div>

        <StorySlideShowCarousel />

        <div className="h-[35vh] flex flex-col items-center text-center justify-center">
          <h1 className="text-lg md:text-2xl text-gray-600">
            So? are you interested in documenting your travel experiences with
            <span>
              <img
                src={LOGO}
                alt="travel-story"
                className="h-10 inline-flex px-2 bg-cyan-100 rounded"
              />
            </span>
            ?
          </h1>
          <p className="text-[18px] text-gray-600">
            <span
              className="text-cyan-500 font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>{" "}
            now to get started immediately!
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
