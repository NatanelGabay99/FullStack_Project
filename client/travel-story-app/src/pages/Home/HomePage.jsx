import LOGO from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/Cards/EmptyCard";
import Footer from "../../components/Footer";

import { DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "../../components/Cards/FilterInfoTitle";
import { getEmptyCardImg, getEmptyCardMessage } from "../../utils/helper";
import StorySlideShowCarousel from "../../components/StorySlideShowCarousel";

const HomePage = () => {
  const navigate = useNavigate();
  
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [filterType, setFilterType] = useState("");

  const [dateRange, setDateRange] = useState({ form: null, to: null });

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const getUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        navigate('/dashboard');
        return;
      }

      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        // set user info if data exists
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        // clear local storage if unauthorized
        localStorage.clear();
        return;
      }
    }
  };

  // get all stories
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
  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data });
  };

  // handle travel story click
  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  // handle update favorite
  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put("/favorite-story/" + storyId, {
        isFavorite: !storyData.isFavorite,
      });
      if (response.data && response.data.travelStory) {
        if (response.data.travelStory.isFavorite) {
          toast.success("This story has been liked");
        } else {
          toast.error("This story has been unliked");
        }
        if (filterType === "search" && searchQuery) {
          onSeachStory(searchQuery);
        } else if (filterType === "date") {
          filterStoriesByDate(dateRange);
        } else {
          getAllTravelStories(); // Refresh the travel stories
        }
      }
    } catch (error) {
      console.error("An Unexpected Error Occurred. Please try again.", error);
    }
  };

  // delete story
  const deleteTravelStory = async (data) => {
    const storyId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-story/" + storyId);

      if (response.data && !response.data.error) {
        toast.error("Story has been deleted");
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllTravelStories();
      }
    } catch (error) {
      // handle unexpected errors
      console.log("An unexpected error occurred. Please try again", error);
    }
  };

  // search story
  const onSeachStory = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: { query },
      });

      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllStories(response.data.stories);
      }
    } catch (error) {
      // handle unexpected errors
      console.log("An unexpected error occurred. Please try again", error);
    }
  };

  // handle clear search
  const handleClearSearch = () => {
    setFilterType("");
    getAllTravelStories();
  };

  // handle filter stories by date select
  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;

      if (startDate & endDate) {
        const response = await axiosInstance.get("/filter-stories", {
          params: { startDate, endDate },
        });

        if (response.data && response.data.stories) {
          setFilterType("date");
          setAllStories(response.data.stories);
        }
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again", error);
    }
  };

  // handle date range select
  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  };

  const restFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType("");
    getAllTravelStories();
  };

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <NavBar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSeachStory}
        handleClearSearch={handleClearSearch}
        displaySearch={false}
      />

      <div className="container w-full max-w-full py-10 bg-[#F0F8FF]">
        <div className="flex flex-col items-center text-center justify-center mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-600">
            Welcome to
          </h1>
          <img src={LOGO} alt="travel-story" className="h-20 hover:bg-cyan-100 px-3 py-1 rounded  ease-in-out duration-1000" />
          <div className="text-center">
            <h2 className="text-lg md:text-2xl font-semibold text-cyan-600">
              "Your Journey, Their Stories"
            </h2>
            <p className="text-xl sm:text-lg text-gray-600 mt-2">
              Discover{" "}
              <span className="text-cyan-500 font-medium">
                Other Travel Experiences
              </span>{" "}
              from Around the World.
            </p>
          </div>
        </div>

        <FilterInfoTitle
          filterType={filterType}
          filterDates={dateRange}
          onClear={() => {
            restFilter();
          }}
        />

        <StorySlideShowCarousel />

        <div className="h-[35vh] flex flex-col items-center text-center justify-center">
        <h1 className="text-lg md:text-2xl text-gray-600">So? are you interested in documenting your travel experiences with 
          <span><img src={LOGO} alt="travel-story" className="h-10 inline-flex px-2 bg-cyan-100 rounded"/></span>?</h1>
          <p className="text-[18px] text-gray-600"><span className="text-cyan-500 font-semibold cursor-pointer" onClick={() => navigate("/signup")}>Signup</span>{" "} now to get started immediately!</p>

        </div>

        <div>
          {localStorage.getItem("accessToken") && (
            <div
              className="bg-white border border-slat-200 shadow-lg shadow-slate-200/60
            rounded-lg hover:shadow-lg hover:shadow-slate-300 transition-all ease-in-out 
            relative cursor-pointer"
            >
              <div className="p-3">
                <DayPicker
                  captionLayout="dropdown-buttons"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pagedNavigation
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add and Edit travel story Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      {/* View travel story Modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null);
          }}
        />
      </Modal>

      {userInfo && (
        <button
          className="w-16 h-16 flex items-center justify-center 
        rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>
      )}

      <Footer />
    </>
  );
};

export default HomePage;