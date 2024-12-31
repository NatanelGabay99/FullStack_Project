import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import TravelStoryCard from "./Cards/TravelStoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ViewTravelStory from "../pages/Home/ViewTravelStory";
import Modal from "react-modal";
import { useMediaQuery } from "react-responsive";

const StorySlideShowCarousel = () => {

  const isXS = useMediaQuery({ query: '(max-width: 576px)' });
 
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: isXS? 1: 4,
    slidesToScroll: 1,
  };

  const [allStories, setAllStories] = useState([]);

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

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

  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  useEffect(() => {
    getAllTravelStories();
  }, []);

  return (
    <div>
      <div className="slider-container">
        <div className="flex justify-center mb-8">
          <p className="text-3xl font-semibold text-cyan-500">
            Here are some stories people have shared
          </p>
        </div>
        <Slider {...settings}>
          {allStories.map((item) => (
            <div key={item._id}>
              <TravelStoryCard
                key={item._id}
                imgUrl={item.imageUrl}
                title={item.title}
                story={item.story}
                date={item.visitedDate}
                visitedLocation={item.visitedLocation}
                isFavorite={item.isFavorite}
                onClick={() => handleViewStory(item)}
                onFavoriteClick={() => {}}
              />
            </div>
          ))}
        </Slider>
      </div>
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
        />
      </Modal>
    </div>
  );
};

export default StorySlideShowCarousel;
