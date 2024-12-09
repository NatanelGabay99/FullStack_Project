import PropTypes from "prop-types";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {

  const [inputValue, setInputValue] = useState([]);

  const addNewTag = () => {};


  return (
    <div>
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add Location"
        />

        <button 
        className="w-8 h-8 flex items-center justify-center rounded border border-cyan-500 
        hover:bg-cyan-500 transform hover:scale-100 transition-all duration-100 ease-in-out" 
        onClick={addNewTag}>
          <MdAdd className="text-2xl text-cyan-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;

TagInput.propTypes = {
  tags: PropTypes.array,
  setTags: PropTypes.func,
};
