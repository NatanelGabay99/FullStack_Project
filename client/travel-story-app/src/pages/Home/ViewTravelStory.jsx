import moment from "moment";
import { MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import PropTypes from "prop-types";

import { GrMapLocation } from "react-icons/gr";
import { useLocation } from "react-router-dom";

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}
) => {
  const pageLocation = useLocation();


  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">

          {localStorage.getItem("accessToken") && pageLocation.pathname === '/dashboard' &&(
            <div className="flex gap-3">
            <button className="btn-small" onClick={onEditClick}>
              <MdUpdate className="text-lg" /> UPDATE STORY
            </button>

            <button className="btn-small btn-delete" onClick={onDeleteClick}>
              <MdDeleteOutline className="text-lg" /> Delete
            </button>
            </div>
          )}

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">
            {storyInfo && storyInfo.title}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
            </span>

            <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1">
              <GrMapLocation className="text-sm" />
              {storyInfo &&
                storyInfo.visitedLocation.map((item, index) =>
                  storyInfo.visitedLocation.length == index + 1
                    ? `${item}`
                    : `${item}, `
                )}
            </div>
          </div>
        </div>

        <img
          src={storyInfo && storyInfo.imageUrl}
          alt="Selected"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="mt-4">
          <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">{storyInfo.story}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;


ViewTravelStory.propTypes = {
  storyInfo: PropTypes.object,
  onClose: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
