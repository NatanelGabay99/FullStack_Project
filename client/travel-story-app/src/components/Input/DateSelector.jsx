import moment from "moment";
import { MdOutlineDateRange, MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { DayPicker } from "react-day-picker";
import { useState } from "react";

const DateSelector = ({ date, setDate }) => {
   const [openDatePicker, setOpenDatePicker] = useState(false);



  return (
    <div>
    <button
      className="date-selector-button"
      onClick={() => {
        setOpenDatePicker(true);
      }}
    >
      <MdOutlineDateRange className="date-selector-icon" />
      {date
        ? moment(date).format("Do MMM YYYY")
        : moment().format("Do MMM YYYY")}
    </button>
  
    {openDatePicker && (
      <div className="date-picker-modal">
        <button
          className="date-picker-close-button"
          onClick={() => {
            setOpenDatePicker(false);
          }}
        >
          <MdClose className="date-picker-close-icon" />
        </button>
  
        <DayPicker
          captionLayout="dropdown-buttons"
          mode="single"
          selected={date}
          onSelect={setDate}
          pagedNavigation
        />
      </div>
    )}
  </div>
  
  );
};

export default DateSelector;

DateSelector.propTypes = {
  date: PropTypes.string,
  setDate: PropTypes.func,
};
