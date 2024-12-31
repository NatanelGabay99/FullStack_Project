import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const isToken = localStorage.getItem("accessToken");

  const getUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user) {
          // set user info if data exists
          setUserInfo(response.data.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} />

      <div className="max-w-5xl mx-[15%] mt-8 px-4">
        <section className="mb-8">
          <h1 className="text-5xl font-semibold text-cyan-500 mb-[3rem] mr-7">
            About the app
          </h1>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            What is Travel Story?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>Travel Story</strong> is your personal travel journal app
            designed to help you capture and organize your unforgettable travel
            experiences. Whether it’s a weekend getaway or a long vacation, you
            can create, store, and revisit your stories with ease. Add photos,
            locations, dates, and detailed descriptions to relive those moments
            anytime.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            How do you use the app?
          </h2>
          <h4 className="font-medium mb-4 text-gray-700">
            <strong>Signup</strong> to gain access to:
          </h4>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-cyan-500">
              1. Creating a New Story
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Click the '+' button at the bottom-right corner of the home page
              to create/add a new story. Fill in details like the title,
              location, date, and a description. Upload a photo to capture the
              memory.
            </p>
          </div>
        </section>

        <section className="mt-7">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-cyan-500">
              2. Viewing and Search Stories
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All your stories are displayed on the home page in a clean card
              layout. Use the search bar at the top to find a story quickly by
              it's title or location.
            </p>
          </div>
        </section>

        <section className="mt-7">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-cyan-500">
              3. Editing/Updating an Existing Story
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Click on a story card to view its details. Inside, you can find an
              edit option to update the title, description, date, or photo.
            </p>
          </div>
        </section>

        <section className="mt-7">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-cyan-500">
              4. Deleting a Story
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To remove a story you no longer need, click on the delete icon
              within the story details. This action will permanently remove the
              story from your collection.{" "}
            </p>
          </div>
        </section>

        {!isToken?( <section className="my-[1.5em] text-center">
          <p className="text-gray-600">
            Start using{" "}
            <span
              className="text-cyan-500 font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Travel Story
            </span>{" "}
            today to make every travel moment memorable!
          </p>
        </section>): null}
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
