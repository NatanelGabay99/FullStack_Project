import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const getUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/login");
      }
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        // set user info if data exists
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        // clear local storage if unauthorized
        localStorage.clear();
        navigate("/login"); // redirect to login
      }
    }
  };

  //get al stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An Unexpected Error Occurred. Please try again", error);
    }
  };

  // handle Edit story
  const handleEdit = async () => {};

  // handle travel story click
  const handleViewStory = async () => {};

  // handle update favorite
  const updateIsFavorite = () => {};

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} />

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {allStories.map((item) => {
                  return <TravelStoryCard 
                  key={item._id} 
                  imgUrl={item.imageUrl}
                  title={item.title}
                  story={item.story}
                  date={item.visitedDate}
                  visitedLocation={item.visitedLocation}
                  isFavorite={item.isFavorite}
                  onEdit={() => handleEdit(item)}
                  onClick={() => handleViewStory(item)}
                  onFavoriteClick={() => updateIsFavorite(item)}
                  />;
                })}
              </div>
            ) : (
              <>Empty Card</>
            )}
          </div>
          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
