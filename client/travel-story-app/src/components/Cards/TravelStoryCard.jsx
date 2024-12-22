import PropTypes from "prop-types";
import moment from "moment";
import { GrMapLocation} from "react-icons/gr";
import { FaHeart } from 'react-icons/fa';


const TravelStoryCard = ({
  imgUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavorite,
  onClick,
  onFavoriteClick,
}) => {
  return (
    <div className=" border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-56 object-cover rounded-lg"
        onClick={onClick}
      />
       {localStorage.getItem('accessToken') &&(
      <button className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border-[3px] border-white/30 absolute top-4 right-4" 
        onClick={onFavoriteClick}>
        <FaHeart className={`icon-btn ${isFavorite? 'text-red-500' : 'text-white'}`}
        />
      </button>
      )}

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-sm text-slate-500">
              {date ? moment(date).format('Do MMM YYYY') : '-'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-2">{story?.slice(0, 60)}</p>

        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
            <GrMapLocation className="text-sm" />
            {visitedLocation.map((item, index)=> visitedLocation.length === index + 1 ? `${item}` : `${item}, `)} 
        </div>

      </div>
    </div>
  );
};

export default TravelStoryCard;

TravelStoryCard.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  story: PropTypes.string,
  date: PropTypes.string,
  visitedLocation: PropTypes.string,
  isFavorite: PropTypes.bool,
  onClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
};
