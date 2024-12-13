import React from "react";
import PropTypes from "prop-types";


const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-start mt-20 ml-10">
      <img src={imgSrc} alt="No notes" className="w-24"/>

      <p className="w-1/2 text-lg font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;

EmptyCard.propTypes = {
    imgSrc: PropTypes.string,
    message: PropTypes.string,
};

