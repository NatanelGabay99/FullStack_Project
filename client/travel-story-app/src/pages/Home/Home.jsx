import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditTravelStory from "./AddEditTravelStory";

const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const [openAddEditModal, setOpenAddEditModal] = useState({isShown: false, type: "add", data: null});

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
  const handleEdit = () => {};

  // handle travel story click
  const handleViewStory = () => {};

  // handle update favorite
  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put(
        "/favorite-story/" + storyId,
        {
          isFavorite: !storyData.isFavorite,
        }
      );
      if (response.data && response.data.travelStory) {
        if (response.data.travelStory.isFavorite) {
          toast.success("This story has been liked");
        } else {
          toast.error("This story has been unliked");
        }
      }
      getAllTravelStories(); // Refresh the travel stories
    } catch (error) {
      console.error("An Unexpected Error Occurred. Please try again.", error);
    }
  };

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
                  return (
                    <TravelStoryCard
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
                    />
                  );
                })}
              </div>
            ) : (
              <>Empty Card</>
            )}
          </div>
          <div className="w-[320px]"></div>
        </div>
      </div>

      {/* Add and Edit travel story Model */}
      <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=> {}}
      style={{
        overlay:{
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 999,
        }
      }}
      appElement={document.getElementById('root')}
      className="model-box"
      >
      <AddEditTravelStory
      type={openAddEditModal.type}
      storyInfo={openAddEditModal.data}
      onClose={()=>{
        setOpenAddEditModal({isShown: false, type: "add", data: null});
      }}
      getAllTravelStories={getAllTravelStories}
      />
      </Modal>
     


      <button className="w-16 h-16 flex items-center justify-center 
      rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10" 
      onClick={()=> {setOpenAddEditModal({isShown: true, type: "add", data: null})}}>
      <MdAdd className="text-[32px] text-white"/>
      </button>

      <ToastContainer />
    </>
  );
};

export default Home;
